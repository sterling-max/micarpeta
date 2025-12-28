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
    const updateDocumentStatus = usePipeline((state) => state.updateDocumentStatus);
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
        // For now we simulate a URL.
        const mockUrl = URL.createObjectURL(file);

        // Update store
        updateDocumentStatus(docId, mockUrl);

        // Feedback
        // console.log(`Uploaded ${file.name} for ${docId}`);
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

            {/* Actions / Instructions List */}
            {step.instructions && step.instructions.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        Acciones Requeridas
                        <span className="text-xs font-normal bg-brand-100 dark:bg-brand-900 px-2 py-0.5 rounded-full text-brand-600 dark:text-brand-300">
                            {step.instructions.length}
                        </span>
                    </h2>

                    <div className="grid gap-3">
                        {step.instructions.map((instr) => (
                            <InstructionItem key={instr.id} instruction={instr} />
                        ))}
                    </div>
                </div>
            )}

            {/* Documents List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    Documentos Requeridos
                    <span className="text-xs font-normal bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">
                        {step.documents.length}
                    </span>
                </h2>

                {step.documents.length === 0 ? (
                    <GlassCard className="text-center py-8">
                        <p className="text-slate-500 italic mb-4">No se requieren documentos para este paso.</p>
                        <p className="text-sm text-slate-400 mb-6">Si ya has completado las acciones requeridas, puedes marcar el paso como completado manualmente.</p>
                        <Button variant="outline">Marcar como completado</Button>
                    </GlassCard>
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

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Instruction } from "@/types";
import { Lightbulb, ExternalLink } from "lucide-react";

function InstructionItem({ instruction }: { instruction: Instruction }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <GlassCard className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Lightbulb size={20} />
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{instruction.title}</h3>
                            <p className="text-xs text-slate-500">Ver instructivo</p>
                        </div>
                    </div>
                    <Button size="sm" variant="ghost">Abrir</Button>
                </GlassCard>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{instruction.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    <div className="prose dark:prose-invert text-sm max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-line">
                        {instruction.content}
                    </div>

                    {instruction.links && instruction.links.length > 0 && (
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Enlaces útiles</h4>
                            {instruction.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-brand-600 hover:underline text-sm"
                                >
                                    <ExternalLink size={14} /> {link}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
