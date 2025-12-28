"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-100/30 to-transparent dark:from-brand-950/20 -z-10" />

            <div className="w-full max-w-md">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Volver al inicio
                </Link>

                <GlassCard className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Crear Cuenta</h1>
                        <p className="text-slate-500 text-sm">Empieza tu camino a la ciudadanía italiana</p>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Juan Pérez"
                                    className="w-full pl-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="hola@ejemplo.com"
                                    className="w-full pl-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>

                        <Button className="w-full" size="lg">
                            Registrarse
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-slate-500">¿Ya tienes cuenta? </span>
                        <Link href="/login" className="text-brand-600 font-medium hover:underline">
                            Inicia Sesión
                        </Link>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
