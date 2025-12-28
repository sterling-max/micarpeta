"use client";

import { usePipeline } from "@/lib/store";
import { GlassCard } from "@/components/ui/glass-card";
import { FileText, FileCheck, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
    const pipeline = usePipeline((state) => state.pipeline);

    if (!pipeline) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold mb-2">Sin trámite iniciado</h2>
                <p className="text-slate-500">Completa el onboarding primero.</p>
            </div>
        )
    }

    // Get all documents from all steps
    const allDocs = pipeline.steps.flatMap(step => step.documents.map(doc => ({ ...doc, stepTitle: step.title })));
    const uploadedDocs = allDocs.filter(d => !!d.attachmentUrl);
    const pendingDocs = allDocs.filter(d => !d.attachmentUrl);

    return (
        <div className="space-y-6 pb-24">
            <header>
                <h1 className="text-2xl font-bold mb-1">Mis Documentos</h1>
                <p className="text-slate-500 text-sm">Repositorio centralizado de tu carpeta.</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <GlassCard className="p-4 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                        {uploadedDocs.length}
                    </div>
                    <div className="text-xs font-medium text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                        Subidos
                    </div>
                </GlassCard>
                <GlassCard className="p-4 bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {allDocs.length}
                    </div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Total requeridos
                    </div>
                </GlassCard>
            </div>


            {/* Document List */}
            <GlassCard className="p-0 overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-semibold text-sm">Listado Completo</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {allDocs.map(doc => (
                        <div key={doc.id} className="p-4 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                    doc.attachmentUrl ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                                )}>
                                    {doc.attachmentUrl ? <FileCheck size={20} /> : <FileText size={20} />}
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-slate-900 dark:text-slate-200">{doc.name}</p>
                                    <p className="text-xs text-slate-500">{doc.stepTitle}</p>
                                </div>
                            </div>

                            {doc.attachmentUrl && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
                                    <Circle size={4} className="fill-current text-slate-300" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            </GlassCard>

        </div>
    );
}

import { cn } from "@/lib/utils";
