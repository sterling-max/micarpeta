"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Mail, Lock, Code2 } from "lucide-react";
import { useAuth, DEV_USER } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const login = useAuth((state) => state.login);
    const [email, setEmail] = useState(DEV_USER.email);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email);
        router.push("/dashboard");
    };

    const handleDevLogin = () => {
        login(DEV_USER.email);
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
            <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-100/30 to-transparent dark:from-brand-950/20 -z-10" />

            <div className="w-full max-w-md">
                <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Volver al inicio
                </Link>

                <GlassCard className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Bienvenido de nuevo</h1>
                        <p className="text-slate-500 text-sm">Ingresa a tu cuenta para continuar con tu trámite</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="hola@ejemplo.com"
                                    className="w-full pl-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                    required
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

                        <Button type="submit" className="w-full" size="lg">
                            Iniciar Sesión
                        </Button>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                            <span className="flex-shrink mx-4 text-slate-400 text-xs">O</span>
                            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        </div>

                        <Button type="button" onClick={handleDevLogin} variant="outline" className="w-full border-dashed border-brand-300 text-brand-600 hover:bg-brand-50  dark:border-brand-800 dark:text-brand-400 dark:hover:bg-brand-950/50">
                            <Code2 className="w-4 h-4 mr-2" /> Login Desarrollador
                        </Button>

                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-slate-500">¿No tienes cuenta? </span>
                        <Link href="/register" className="text-brand-600 font-medium hover:underline">
                            Regístrate
                        </Link>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
