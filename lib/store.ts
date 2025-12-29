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
    resetPipeline: () => void;
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
                description: `Reunir actas de la línea de ${data.avoName}. Este es el paso más lento/difícil.`,
                order: 1,
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
                        description: "Acta original en formato multilingüe o traducida.",
                        attachmentUrl: data.hasBirthCert ? "mock_url_placeholder" : undefined
                    },
                    {
                        id: "doc_avo_marriage",
                        name: `Acta de Matrimonio - ${data.avoName}`,
                        type: "marriage",
                        country: "Argentina",
                        isMandatory: true,
                        validations: [],
                        description: "Si no aparece, buscar en iglesias (Fe de Bautismo) como prueba."
                    }
                ],
                instructions: [
                    {
                        id: "instr_mail_comune",
                        title: "Pedir el acta a Italia",
                        content: "💡 **Consejo Real:** No llames por teléfono. Envía un email (mejor si es PEC) a la oficina de *Stato Civile* de la comuna.\n\nEscribe en italiano simple. Si no responden en 30 días, considera enviar carta postal o contratar un gestor local.",
                        links: ["https://www.poste.it/prodotti/raccomandata-online.html"]
                    },
                    {
                        id: "instr_find_doc",
                        title: "🔍 ¿No sabes dónde buscar?",
                        content: "Si no tienes datos precisos o la comuna no responde, te recomendamos contactar a un gestor especializado en búsqueda de actas.\n\n**Recomendación:** Puedes consultar con **Itadoc** (itadoc.it), son expertos en búsquedas difíciles y tienen equipo en Italia.",
                        links: ["https://itadoc.it"]
                    }
                ]
            },
            {
                id: "step_cnn",
                title: "Certificado No Naturalización",
                description: "El famoso F003 de la Cámara Nacional Electoral. Fundamental que no haya renunciado a la ciudadanía.",
                order: 2,
                status: "pending",
                dependencies: ["step_recollection"],
                metadata: {},
                documents: [
                    {
                        id: "doc_cnn",
                        name: "Certificado CNE (F003)",
                        type: "criminal_record",
                        country: "Argentina",
                        isMandatory: true,
                        validations: [],
                        description: "Digital con firma electrónica."
                    }
                ],
                instructions: [
                    {
                        id: "instr_cne_variants",
                        title: "⚠️ El truco de los Nombres",
                        content: "**¡Muy Importante!** Al pedir el CNE, debes declarar TODAS las variantes de nombre del Avo que aparezcan en las actas argentinas (ej: Giuseppe, Jose, José, Joseph).\n\nSi no lo haces y luego aparece un acta con otro nombre, el CNE no servirá y deberás rectificarlo (pagando de nuevo y perdiendo tiempo).",
                        links: ["https://www.electoral.gob.ar/nuevo/index.php"]
                    }
                ]
            },
            {
                id: "step_apostille",
                title: "Apostillas de la Haya",
                description: "Validación internacional. Sin esto, tus documentos argentinos NO valen en el exterior.",
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
                        isMandatory: false,
                        validations: [],
                        description: "Solo si el acta argentina es digital o firma ológrafa legalizada."
                    },
                    {
                        id: "doc_apostille_cnn",
                        name: "Apostilla - CNE",
                        type: "apostille",
                        country: "Argentina",
                        isMandatory: true,
                        validations: [],
                        description: "La apostilla debe estar vinculada al PDF del CNE."
                    }
                ],
                instructions: [
                    {
                        id: "instr_tad_vs_college",
                        title: "TAD vs Colegio de Escribanos",
                        content: "Tienes dos caminios:\n\n1. **TAD (Trámites a Distancia):** Barato pero LENTO (30-60 días). Hazlo si tienes tiempo.\n2. **Colegio de Escribanos:** Caro pero RÁPIDO (A veces en el día). Úsalo si viajas pronto o si el documento tiene firma de hace muchos años que requiere validación extra.",
                        links: ["https://tramitesadistancia.gob.ar"]
                    }
                ]
            },
            {
                id: "step_translation",
                title: "Traducciones",
                description: "Aquí es donde muchos cometen error. Depende 100% de DÓNDE presentas la carpeta.",
                order: 4,
                status: "blocked",
                dependencies: ["step_apostille"],
                metadata: {},
                documents: [
                    {
                        id: "doc_trans_avo_birth",
                        name: "Carpeta Traducida",
                        type: "translation",
                        country: "Italy",
                        isMandatory: true,
                        validations: [],
                        description: "Juego completo de traducciones."
                    }
                ],
                instructions: [
                    {
                        id: "instr_trans_place",
                        title: "📍 ¿Donde presentas?",
                        content: "**Si presentas en consulado Argentino:**\nNecesitas Traductor Público Matriculado + Legalización Colegio de Traductores.\n\n**Si presentas en Italia (Viaje):**\nNO te sirve la traducción simple de acá. Tienes que hacer:\n\n*   Option A: *Visto Consular* (Eterno, no recomendado).\n*   Option B: *Asseverazione* (Traducir todo allá en tribunales, costoso pero seguro).\n\nPara **Asseverazione** o traducciones complejas, **Itadoc** ofrece servicio integral de validación en tribunales italianos.",
                        links: ["https://itadoc.it"]
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

            resetPipeline: () => set({ pipeline: null }),

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
                        const hasSomeProgress = newDocs.some(d => !!d.attachmentUrl);

                        // Auto-update step status logic:
                        // 1. If all mandatory docs done -> Completed
                        // 2. If not all done but has some progress and was pending -> In Progress

                        let newStepStatus = step.status;

                        if (allMandatoryDone && (step.status === 'in_progress' || step.status === 'pending')) {
                            newStepStatus = 'completed';
                        } else if (!allMandatoryDone && hasSomeProgress && step.status === 'pending') {
                            newStepStatus = 'in_progress';
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
