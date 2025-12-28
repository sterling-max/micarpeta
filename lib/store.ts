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
                instructions: []
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
            updateDocumentStatus: () => { }, // TODO
        }),
        { name: "pipeline-storage" }
    )
);

// Helper hook for consuming the store in components
import { useSyncExternalStore } from 'react';

export function usePipeline<T>(selector: (state: PipelineState) => T): T {
    return useStore(usePipelineStore, selector);
}
