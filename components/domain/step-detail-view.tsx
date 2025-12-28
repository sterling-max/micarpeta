"use client";

import { usePipeline } from "@/lib/store";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentCard } from "@/components/domain/document-card";
import { DocumentRequirement } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";

export function StepDetailView({ stepId }: { stepId: string }) {
    const router = useRouter();
    const pipeline = usePipeline((state) => state.pipeline);
    // Also need an action to update document status, but store mock is simple for now.

    if (!pipeline) {
        router.push("/dashboard");
        return null;
    }

    const step = pipeline.steps.find((s) => s.id === stepId);

    if (!step) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold mb-2">Paso no encontrado</h2>
                <Button onClick={() => router.push("/dashboard")}>Volver</Button>
            </div>
        );
    }

    const handleUpload = (docId: string, file: File) => {
        // In a real app we would upload to S3/Server here.
        // For now we just console log and maybe would toggle state if we had that action ready.
        console.log(`Uploading ${file.name} for ${docId}`);
        alert("Simulación: Archivo subido. En producción esto se guardaría en el servidor.");
        // TODO: Call store action to update document status to 'uploaded'
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="-ml-2">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Paso {step.order}
                </span>
            </div>

            <header>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    {step.title}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                </p>
            </header>

            {/* Progress / Status */}
            <GlassCard className="flex items-center gap-4 py-4 px-5 bg-brand-50/50 dark:bg-brand-900/10 border-brand-100 dark:border-brand-800">
                <div className="flex-1">
                    <p className="text-sm font-medium text-brand-900 dark:text-brand-100">Estado del paso</p>
                    <p className="text-xs text-brand-700 dark:text-brand-300">
                        {step.status === 'completed' ? 'Completado' : 'En progreso - Faltan documentos'}
                    </p>
                </div>
                {step.status === 'completed' ? (
                    <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                ) : (
                    <Circle className="text-brand-500 w-6 h-6" />
                )}
            </GlassCard>

            {/* Documents List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    Documentos Requeridos
                    <span className="text-xs font-normal bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">
                        {step.documents.length}
                    </span>
                </h2>

                {step.documents.length === 0 ? (
                    <p className="text-slate-500 italic">No se requieren documentos para este paso.</p>
                ) : (
                    step.documents.map((doc: DocumentRequirement) => (
                        <DocumentCard
                            key={doc.id}
                            document={doc}
                            onUpload={(file) => handleUpload(doc.id, file)}
                        />
                    ))
                )}
            </div>

        </div>
    );
}
