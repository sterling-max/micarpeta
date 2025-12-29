"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Smartphone, Share, PlusSquare, Download } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export function PwaInstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [platform, setPlatform] = useState<"ios" | "android" | "desktop">("desktop");
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Detect Platform
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIos = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

        if (isStandalone) {
            return; // Already installed
        }

        if (isIos) setPlatform("ios");
        else if (isAndroid) setPlatform("android");

        // Handle Android "Add to Home Screen" event
        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);

            // Auto-show prompt on Android if available and on Dashboard
            if (isAndroid && pathname === '/dashboard') {
                setShowPrompt(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Check for manual trigger via URL
        if (searchParams.get('install') === 'true') {
            setShowPrompt(true);
        }

        // Auto show for iOS after delay if on dashboard
        if (isIos && pathname === '/dashboard' && !searchParams.get('install')) {
            const timer = setTimeout(() => setShowPrompt(true), 5000);
            return () => {
                clearTimeout(timer);
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            };
        }

        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, [searchParams, pathname]);

    const handleInstallClick = () => {
        if (platform === "android" && deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                setDeferredPrompt(null);
                setShowPrompt(false);
            });
        } else {
            // Fallback for when PWA event didn't fire (insecure context or unsupported)
            alert("Si no sucede nada, utiliza el menú de tu navegador (tres puntos) y selecciona 'Instalar aplicación' o 'Agregar a la pantalla principal'.");
        }
    };

    if (!showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-24 md:pb-4 pointer-events-none flex justify-center"
            >
                <GlassCard className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-brand-200 dark:border-brand-800 shadow-2xl max-w-md w-full relative overflow-hidden">
                    <button
                        onClick={() => setShowPrompt(false)}
                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center shrink-0 text-white shadow-lg">
                            <Smartphone size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                                Instala MiCarpeta
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-snug">
                                {platform === "ios"
                                    ? "Para una mejor experiencia, agrega la App a tu inicio."
                                    : "Instala la aplicación para acceder más rápido y sin conexión."}
                            </p>

                            {platform === "ios" ? (
                                <div className="space-y-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-slate-200 dark:bg-slate-700 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">1</span>
                                        <span>Toca el botón <Share size={12} className="inline mx-0.5" /> <strong>Compartir</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-slate-200 dark:bg-slate-700 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">2</span>
                                        <span>Selecciona <PlusSquare size={12} className="inline mx-0.5" /> <strong>Agregar al Inicio</strong></span>
                                    </div>
                                </div>
                            ) : platform === "android" ? (
                                <Button onClick={handleInstallClick} size="sm" className="w-full bg-brand-600 hover:bg-brand-700 text-white">
                                    <Download size={16} className="mr-2" /> Instalar Aplicación
                                </Button>
                            ) : (
                                <div className="text-xs text-slate-400">
                                    Disponible para instalar en Chrome/Edge Desktop también.
                                </div>
                            )}
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </AnimatePresence>
    );
}
