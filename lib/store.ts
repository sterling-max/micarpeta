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
                description: "Tramitar el Certificado de la Cámara Nacional Electoral (CNE) que acredita que el AVO no se naturalizó argentino.",
                order: 2,
                status: "pending",
                dependencies: ["step_recollection"],
                metadata: {},
                documents: [
                    {
                        id: "doc_cnn",
                        name: "Certificado CNE (F003)",
                        type: "criminal_record", // Using closest type for now or 'other'
                        country: "Argentina",
                        isMandatory: true,
                        validations: [],
                        description: "Documento digital firmado o respuesta oficial de la CNE."
                    }
                ],
                instructions: [
                    {
                        id: "instr_cne_form",
                        title: "Cómo tramitar el CNE",
                        content: "1. Ingresa al sitio de la Cámara Nacional Electoral.\n2. Completa el formulario 003 (Solicitud de Certificado de No Ciudadano Argentino).\n3. Sube los escaneos del Acta de Nacimiento y Defunción del AVO.\n4. Paga el arancel correspondiente generardo el VEP.",
                        links: ["https://www.electoral.gob.ar/nuevo/index.php"]
                    }
                ]
            },
            {
                id: "step_apostille",
                title: "Apostillas de la Haya",
                description: "Legalizar internacionalmente todas las actas argentinas (Nacimiento, Matrimonio, Defunción, CNN).",
                order: 3,
                status: "blocked",
                dependencies: ["step_cnn"],
                metadata: {},
                documents: [
                    {
                        id: "doc_apostille_avo_birth",
                        name: "Apostilla - Nac. AVO",
                        type: "apostille",
                        country: "Argentina",
                        isMandatory: false, // Could be true, but let's leave flexibility
                        validations: [],
                        description: "Apostilla vinculada al acta de nacimiento."
                    },
                    {
                        id: "doc_apostille_cnn",
                        name: "Apostilla - CNE",
                        type: "apostille",
                        country: "Argentina",
                        isMandatory: true,
                        validations: [],
                        description: "Apostilla del certificado de no naturalización."
                    }
                ],
                instructions: [
                    {
                        id: "instr_tad",
                        title: "Trámite por TAD (Trámites a Distancia)",
                        content: "La forma más común es vía TAD con Clave Fiscal Nivel 2+.\n\n1. Ingresa a TAD.\n2. Busca 'Apostilla de la Haya'.\n3. Inicia trámite y sube el PDF del documento a apostillar.\n4. Paga el VEP.\n\nLa demora suele ser de 30-45 días hábiles.",
                        links: ["https://tramitesadistancia.gob.ar"]
                    },
                    {
                        id: "instr_cn_notary",
                        title: "Opción Colegio de Escribanos",
                        content: "Si tienes urgencia, puedes ir al Colegio de Escribanos de tu provincia. Es más costoso pero sale en 24-48hs.",
                        links: []
                    }
                ]
            },
            {
                id: "step_translation",
                title: "Traducciones al Italiano",
                description: "Todas las actas no italianas deben ser traducidas por Traductor Público Matriculado.",
                order: 4,
                status: "blocked",
                dependencies: ["step_apostille"],
                metadata: {},
                documents: [
                    {
                        id: "doc_trans_avo_birth",
                        name: "Traducción - Nac. AVO",
                        type: "translation",
                        country: "Italy",
                        isMandatory: false,
                        validations: [],
                        description: "Traducción y asseverazione (si aplica) o Visto Consular."
                    }
                ],
                instructions: [
                    {
                        id: "instr_translator",
                        title: "Buscar Traductor",
                        content: "Busca un traductor matriculado en el Colegio de Traductores. Debe firmar y sellar la traducción.\n\nLuego, esa firma se legaliza en el colegio de traductores (salvo que sea traducción digital con firma digital reconocida).",
                        links: ["https://www.traductores.org.ar"]
                    }
                ]
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
