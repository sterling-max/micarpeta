"use client";

import { GlassCard } from "@/components/ui/glass-card";
import {
    BookOpen,
    HelpCircle,
    MessageCircle,
    Share2,
    Coffee,
    Info,
    ChevronRight,
    Scale
} from "lucide-react";
import Link from "next/link";

export default function MenuPage() {
    const menuItems = [
        {
            title: "Recursos y Ayuda",
            items: [
                { icon: BookOpen, label: "Guía de Ciudadanía", href: "/guide" },
                { icon: Scale, label: "Normativa 2025", href: "/legal" },
                { icon: HelpCircle, label: "Preguntas Frecuentes", href: "/faq" },
            ]
        },
        {
            title: "Comunidad",
            items: [
                { icon: MessageCircle, label: "Foro de Consultas", href: "/forum" },
                { icon: Share2, label: "Compartir App", href: "#" },
            ]
        },
        {
            title: "Acerca de",
            items: [
                { icon: Coffee, label: "Invítanos un Café", href: "/donate" },
                { icon: Info, label: "Sobre MiCarpeta", href: "/about" },
            ]
        }
    ];

    return (
        <div className="space-y-6 pb-24">
            <h1 className="text-2xl font-bold">Menú</h1>

            {menuItems.map((section, idx) => (
                <div key={idx} className="space-y-3">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">
                        {section.title}
                    </h2>
                    <GlassCard className="p-0 overflow-hidden">
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {section.items.map((item, itemIdx) => (
                                <Link key={itemIdx} href={item.href} className="block">
                                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center group-hover:bg-brand-100 group-hover:text-brand-600 transition-colors">
                                                <item.icon size={18} />
                                            </div>
                                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-300 group-hover:text-brand-400 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            ))}

            <div className="text-center pt-8">
                <p className="text-xs text-slate-400">
                    MiCarpeta v0.1.0 (Beta)
                    <br />
                    Hecho con ❤️ para futuros italianos.
                </p>
            </div>
        </div>
    );
}
