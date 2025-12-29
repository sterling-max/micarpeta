"use client";

import { usePipeline } from "@/lib/store";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Clock, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PipelineViewer() {
    const pipeline = usePipeline((state) => state.pipeline);

    if (!pipeline) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 space-y-6">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-2">
                    <span className="text-4xl">📂</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">Aún no tienes un trámite</h2>
                    <p className="text-slate-500 max-w-xs mx-auto">
                        Configura tu carpeta paso a paso para comenzar tu camino a la ciudadanía.
                    </p>
                </div>
                <Link href="/onboarding">
                    <Button size="lg" className="h-12 px-8">
                        Comenzar mi trámite
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="relative space-y-12 pl-4 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent dark:before:via-slate-800">
                {pipeline.steps.map((step, index) => (
                    <PipelineStepCard key={step.id} step={step} index={index} />
                ))}
            </div>
        </div>
    );
}

function PipelineStepCard({ step, index }: { step: any; index: number }) {
    const statusColors = {
        pending: "bg-slate-100 text-slate-500 border-slate-200",
        in_progress: "bg-brand-50 text-brand-600 border-brand-200 ring-2 ring-brand-100",
        completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
        blocked: "bg-red-50 text-red-500 border-red-200 opacity-75",
    };

    const statusIcons = {
        pending: Circle,
        in_progress: Clock,
        completed: CheckCircle,
        blocked: Lock,
    };

    const Icon = statusIcons[step.status as keyof typeof statusIcons];
    const isCurrent = step.status === 'in_progress';

    return (
        <Link href={`/dashboard/step/${step.id}`} className="block w-full">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8"
            >
                {/* Connector Node */}
                <div className={cn(
                    "absolute left-0 top-6 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-300",
                    step.status === 'completed' ? "bg-emerald-500 border-emerald-500 text-white" :
                        isCurrent ? "bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-500/30 scale-110" :
                            "bg-white dark:bg-slate-950 border-slate-300 text-slate-300 dark:border-slate-700"
                )}>
                    <Icon size={isCurrent ? 18 : 16} />
                </div>

                <GlassCard
                    className={cn(
                        "relative overflow-hidden transition-all duration-300 group cursor-pointer",
                        step.status === 'blocked' ? 'grayscale-[0.5]' : 'hover:-translate-y-1 hover:shadow-lg',
                        isCurrent && "border-brand-500/50 dark:border-brand-400/50 shadow-brand-500/10 ring-1 ring-brand-500/20"
                    )}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={cn(
                            "text-xs font-bold tracking-wider uppercase",
                            isCurrent ? "text-brand-600 dark:text-brand-400" : "text-slate-400"
                        )}>
                            Paso {step.order}
                        </span>
                        {isCurrent && (
                            <span className="bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                ACTUAL
                            </span>
                        )}
                    </div>

                    <h3 className={cn(
                        "text-lg font-semibold mb-1 transition-colors",
                        isCurrent ? "text-brand-700 dark:text-brand-300" : "group-hover:text-brand-600 dark:group-hover:text-brand-400"
                    )}>
                        {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.description}
                    </p>
                    {/* Progress Bar */}
                    {isCurrent && (
                        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-brand-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step.documents.filter((d: any) => !!d.attachmentUrl).length / Math.max(step.documents.length, 1)) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    )}

                    {/* Documents Counter */}
                    {step.documents.length > 0 && (
                        <div className="mt-2 flex items-center justify-end">
                            <span className="text-[10px] items-center font-medium text-slate-400">
                                {step.documents.filter((d: any) => !!d.attachmentUrl).length}/{step.documents.length} docs
                            </span>
                        </div>
                    )}
                </GlassCard>
            </motion.div>
        </Link>
    );
}
