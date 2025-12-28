"use client";

import { useAuth } from "@/lib/auth";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { User, Mail, LogOut, Settings, Moon, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const user = useAuth((state) => state.user);
    const logout = useAuth((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (!user) {
        return (
            <div className="p-4 text-center">
                <p>Inicia sesión para ver tu perfil.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Mi Perfil</h1>

            {/* User Info */}
            <GlassCard className="flex items-center gap-4">
                <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center text-brand-600 text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Mail size={12} /> {user.email}
                    </p>
                </div>
            </GlassCard>

            {/* Settings List */}
            <GlassCard className="p-0 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <Settings className="text-slate-500" size={20} />
                            <span className="font-medium">Configuración de Cuenta</span>
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <Moon className="text-slate-500" size={20} />
                            <span className="font-medium">Apariencia</span>
                        </div>
                        <span className="text-xs text-slate-400">Automático</span>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <Globe className="text-slate-500" size={20} />
                            <span className="font-medium">Idioma</span>
                        </div>
                        <span className="text-xs text-slate-400">Español</span>
                    </div>
                </div>
            </GlassCard>

            <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
            </Button>
        </div>
    );
}
