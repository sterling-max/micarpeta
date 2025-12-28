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
            <header className="mb-6">
                <h1 className="text-2xl font-bold font-sans text-balance">
                    {pipeline.name}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Versión {pipeline.version}
                </p>
            </header>

            <div className="relative space-y-8 pl-4 before:absolute before:inset-0 before:ml-4 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent dark:before:via-slate-800">
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
        in_progress: "bg-blue-50 text-blue-600 border-blue-200 ring-2 ring-blue-100",
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

    return (
        <Link href={`/dashboard/step/${step.id}`}>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8"
            >
                {/* Connector Node */}
                <div className={cn(
                    "absolute left-0 top-6 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white dark:bg-slate-950 z-10",
                    step.status === 'completed' ? "border-emerald-500 text-emerald-500" :
                        step.status === 'in_progress' ? "border-brand-500 text-brand-500" :
                            "border-slate-300 text-slate-300 dark:border-slate-700"
                )}>
                    <Icon size={16} />
                </div>

                <GlassCard
                    className={cn(
                        "relative overflow-hidden transition-all group cursor-pointer",
                        step.status === 'blocked' ? 'grayscale-[0.5]' : 'hover:border-brand-300/50'
                    )}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                            Paso {step.order}
                        </span>
                        {step.status === 'in_progress' && (
                            <span className="bg-brand-100 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                EN PROGRESO
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold mb-1 group-hover:text-brand-600 transition-colors">
                        {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.description}
                    </p>

                    {/* Progress Bar (Mock) */}
                    {step.status === 'in_progress' && (
                        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500 w-1/3 rounded-full" />
                        </div>
                    )}
                </GlassCard>
            </motion.div>
        </Link>
    );
}
