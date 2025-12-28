"use client";

import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { Pipeline, Step, DocumentRequirement, OnboardingData } from "@/types";

interface PipelineState {
    pipeline: Pipeline | null;
    isLoading: boolean;

    // Actions
    setPipeline: (pipeline: Pipeline) => void;
    generatePipeline: (data: OnboardingData) => void;
    updateStepStatus: (stepId: string, status: Step['status']) => void;
    updateDocumentStatus: (documentId: string, status: any) => void; // TODO: Define status type
}

// Helper to create the standard 2025 pipeline
const createStandardPipeline = (data: OnboardingData): Pipeline => {
    return {
        id: `pipe_${Date.now()}`,
        userId: "current_user",
        name: `Ciudadanía - ${data.consulate}`,
        version: "2025.1",
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        steps: [
            {
                id: "step_recollection",
                title: "Recolección de Actas",
                description: `Reunir actas de la línea de ${data.avoName}.`,
                order: 1,
                // If they already have the birth cert, we might consider this step partially advanced, 
                // but for safety usually better to verify first. Let's keep in_progress.
                status: "in_progress",
                dependencies: [],
                metadata: { avoName: data.avoName },
                documents: [
                    {
                        id: "doc_avo_birth",
                        name: `Acta de Nacimiento - ${data.avoName}`,
                        type: "birth",
                        country: "Italy",
                        isMandatory: true,
                        validations: [],
                        description: "Acta original solicitada a la comuna italiana.",
                        // If they said they have it, we could mark it as uploaded or similar in future
                        attachmentUrl: data.hasBirthCert ? "mock_url_placeholder" : undefined
                    },
                    {
                        id: "doc_avo_marriage",
                        name: `Acta de Matrimonio - ${data.avoName}`,
                        type: "marriage",
                        country: "Argentina", // Default assumption, editable later
                        isMandatory: true,
                        validations: [],
                        description: "Si se casó en el país de emigración."
                    }
                ],
                instructions: []
            },
            {
                id: "step_cnn",
                title: "Certificado No Naturalización",
                description: "Tramitar el CNE o CNN ante la cámara electoral.",
                order: 2,
                status: "pending",
                dependencies: ["step_recollection"],
                metadata: {},
                documents: [],
                instructions: [
                    {
                        id: "instr_cne_form",
                        title: "Completar Formulario 003",
                        content: "Debes ingresar al sitio de la Cámara Nacional Electoral y completar el formulario 003 (Solicitud de Certificado de No Ciudadano Argentino).\n\n**Requisitos:**\n- DNI digital\n- Acta de nacimiento del avo\n- Acta de defunción (si aplica)\n\n[Ir al sitio oficial](https://www.electoral.gob.ar/nuevo/index.php)",
                        links: ["https://www.electoral.gob.ar"]
                    },
                    {
                        id: "instr_pay_tax",
                        title: "Pagar Arancel",
                        content: "El trámite tiene un costo administrativo. Debes generar el VEP o boleta de pago en la misma plataforma.",
                        links: []
                    }
                ]
            },
            {
                id: "step_apostille",
                title: "Apostillas",
                description: "Apostillar todos los documentos no italianos.",
                order: 3,
                status: "blocked",
                dependencies: ["step_cnn"],
                metadata: {},
                documents: [],
                instructions: []
            },
            {
                id: "step_translation",
                title: "Traducciones",
                description: "Traducción pública o matriculada de actas apostilladas.",
                order: 4,
                status: "blocked",
                dependencies: ["step_apostille"],
                metadata: {},
                documents: [],
                instructions: []
            }
        ]
    };
};

export const usePipelineStore = createStore<PipelineState>()(
    persist(
        (set) => ({
            pipeline: null, // Start empty so we can check if it exists
            isLoading: false,

            setPipeline: (pipeline) => set({ pipeline }),

            generatePipeline: (data) => {
                const newPipeline = createStandardPipeline(data);
                set({ pipeline: newPipeline });
            },

            updateStepStatus: (stepId, status) =>
                set((state) => {
                    if (!state.pipeline) return {};
                    const newSteps = state.pipeline.steps.map(s =>
                        s.id === stepId ? { ...s, status } : s
                    );
                    return { pipeline: { ...state.pipeline, steps: newSteps } };
                }),
            updateDocumentStatus: (documentId, status) =>
                set((state) => {
                    if (!state.pipeline) return {};

                    let pipelineUpdated = false;

                    const newSteps = state.pipeline.steps.map(step => {
                        const docIndex = step.documents.findIndex(d => d.id === documentId);
                        if (docIndex === -1) return step; // Document not in this step

                        // Update the document
                        const newDocs = [...step.documents];
                        // If status is a string (url), we treat it as attachmentUrl
                        if (typeof status === 'string') {
                            newDocs[docIndex] = { ...newDocs[docIndex], attachmentUrl: status };
                        } else {
                            // Fallback if we pass a complex object later
                            newDocs[docIndex] = { ...newDocs[docIndex], ...status };
                        }

                        pipelineUpdated = true;

                        // Check if step should be completed
                        // Logic: All mandatory documents have an attachmentUrl
                        const allMandatoryDone = newDocs.every(d => !d.isMandatory || !!d.attachmentUrl);

                        // Auto-update step status if it was in_progress or pending
                        let newStepStatus = step.status;
                        if (allMandatoryDone && (step.status === 'in_progress' || step.status === 'pending')) {
                            newStepStatus = 'completed';
                        }

                        return { ...step, documents: newDocs, status: newStepStatus };
                    });

                    if (!pipelineUpdated) return {};

                    // If a step was completed, we might want to unblock the next one
                    // This is a simple linear check.
                    let stepsWithUnlock = [...newSteps];
                    for (let i = 0; i < stepsWithUnlock.length - 1; i++) {
                        if (stepsWithUnlock[i].status === 'completed' && stepsWithUnlock[i + 1].status === 'blocked') {
                            stepsWithUnlock[i + 1] = { ...stepsWithUnlock[i + 1], status: 'pending' };
                        }
                    }

                    return { pipeline: { ...state.pipeline, steps: stepsWithUnlock } };
                }),
        }),
        { name: "pipeline-storage" }
    )
);

// Helper hook for consuming the store in components
import { useSyncExternalStore } from 'react';

export function usePipeline<T>(selector: (state: PipelineState) => T): T {
    return useStore(usePipelineStore, selector);
}
