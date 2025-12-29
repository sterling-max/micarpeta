"use client";

import { usePipeline } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper, PartyPopper, CheckCircle2, AlertTriangle, FolderClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const pipeline = usePipeline((state) => state.pipeline);
    const user = useAuth((state) => state.user);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Avoid hydration mismatch

    if (!pipeline) {
        return (
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold">Cargando...</h2>
            </div>
        )
    }

    const currentStep = pipeline.steps.find(s => s.status === 'in_progress') || pipeline.steps.find(s => s.status === 'pending');
    const completedSteps = pipeline.steps.filter(s => s.status === 'completed').length;
    const totalSteps = pipeline.steps.length;
    const progress = Math.round((completedSteps / totalSteps) * 100);
    const isFullyCompleted = completedSteps === totalSteps;

    return (
        <div className="space-y-8 pb-24">
            {/* Top Brand Header */}
            <div className="flex justify-between items-center py-2 px-1">
                <div className="flex items-center gap-2">
                    <div className="text-brand-600 dark:text-brand-500">
                        {/* Matching the Blue Folder Icon concept */}
                        <FolderClosed size={28} strokeWidth={0} className="fill-brand-600 dark:fill-brand-500" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold leading-none text-slate-800 dark:text-slate-100">MiCarpeta</h1>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Gestión de Ciudadanía</p>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-xs text-slate-400">Hola,</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user?.name.split(' ')[0]}</p>
                </div>
            </div>

            {/* Hero Status Section */}
            {isFullyCompleted ? (
                <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/20 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-800 mix-blend-multiply z-10" />
                    {/* Background Pattern/Image */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />

                    <div className="relative z-20 h-full flex flex-col justify-end p-6 text-white pb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="bg-emerald-500/20 backdrop-blur-md p-2 rounded-full">
                                <CheckCircle2 className="text-emerald-300 w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight">¡Tutto Finito!</h2>
                        </div>
                        <p className="text-emerald-100 text-lg mb-6 max-w-xs leading-relaxed">
                            Has completado tu carpeta. Estás listo para presentar tu trámite.
                        </p>
                        <Button onClick={() => router.push('/pipeline')} className="w-full bg-white text-emerald-800 hover:bg-emerald-50 font-bold h-12 rounded-xl transition-all shadow-lg hover:translate-y-[-2px]">
                            Revisar Carpeta Completa
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="relative w-full h-[340px] rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/20 group">
                    {/* Hero Background - Full Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent z-10" />

                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529260830199-42c42dda5f3d?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />

                    <div className="relative z-20 h-full flex flex-col justify-between p-6 text-white">
                        <div className="flex justify-between items-start pt-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium tracking-wide">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                                </span>
                                En Progreso
                            </span>
                            <div className="flex flex-col items-end">
                                <span className="text-4xl font-bold tracking-tighter">{progress}%</span>
                                <span className="text-[10px] uppercase tracking-widest opacity-70">Completado</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-2">
                            <div>
                                <p className="text-brand-200 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <ArrowRight className="w-3 h-3" /> Siguiente Paso
                                </p>
                                <h2 className="text-3xl font-bold leading-tight mb-2 text-balance">
                                    {currentStep ? currentStep.title : 'Revisión Final'}
                                </h2>
                                <p className="text-brand-100 text-sm line-clamp-2 opacity-90 leading-relaxed">
                                    {currentStep ? currentStep.description : 'Todos los pasos han sido completados.'}
                                </p>
                            </div>

                            <Link href="/pipeline" className="block">
                                <Button size="lg" className="w-full bg-white text-brand-950 hover:bg-brand-50 font-bold h-14 text-base rounded-xl transition-all shadow-lg shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5 border-0">
                                    Continuar Trámite
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Improved News Feed */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Newspaper size={20} className="text-brand-600" /> Novedades
                    </h2>
                    <Button variant="ghost" size="sm" className="text-xs text-brand-600 hover:text-brand-700">Ver todo</Button>
                </div>

                <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x snap-mandatory no-scrollbar text-white">
                    {/* Featured Article */}
                    <div className="min-w-[280px] h-[200px] snap-center rounded-2xl overflow-hidden relative cursor-pointer shadow-lg group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=400')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative z-20 h-full flex flex-col justify-end p-5">
                            <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">NOTICIA</span>
                            <h3 className="font-bold text-lg leading-tight mb-1">Nuevos turnos para reconstrucción</h3>
                            <p className="text-xs text-slate-300">Consulado de Buenos Aires</p>
                        </div>
                    </div>

                    {/* Article 2 */}
                    <div className="min-w-[280px] h-[200px] snap-center rounded-2xl overflow-hidden relative cursor-pointer shadow-lg group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565514020176-db8bcec05367?auto=format&fit=crop&w=400')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative z-20 h-full flex flex-col justify-end p-5">
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">CONSEJO</span>
                            <h3 className="font-bold text-lg leading-tight mb-1">¿Cómo legalizar partidas digitales?</h3>
                            <p className="text-xs text-slate-300">Guía paso a paso</p>
                        </div>
                    </div>

                    {/* Article 3 */}
                    <div className="min-w-[280px] h-[200px] snap-center rounded-2xl overflow-hidden relative cursor-pointer shadow-lg group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500" />
                        <div className="relative z-20 h-full flex flex-col justify-end p-5">
                            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">IMPORTANTE</span>
                            <h3 className="font-bold text-lg leading-tight mb-1">Formulario F003 actualizado</h3>
                            <p className="text-xs text-slate-300">Cámara Nacional Electoral</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ArticleCard({ category, title, date, image }: { category: string, title: string, date?: string, image: string }) {
    return (
        <GlassCard className="p-0 flex items-stretch overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="w-24 bg-slate-200 relative">
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="flex-1 p-3 flex flex-col justify-center">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide bg-brand-50 dark:bg-brand-900/50 px-1.5 py-0.5 rounded">
                        {category}
                    </span>
                    {date && <span className="text-[10px] text-slate-400">{date}</span>}
                </div>
                <h3 className="text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100 group-hover:text-brand-600 transition-colors">
                    {title}
                </h3>
            </div>
        </GlassCard>
    );
}
