"use client";

import { Home, FileText, User, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Pipeline", icon: Home, href: "/dashboard" },
    { label: "Documentos", icon: FileText, href: "/documents" },
    { label: "Perfil", icon: User, href: "/profile" },
    { label: "Menu", icon: Menu, href: "/menu" },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/20 pb-safe pt-2 px-6 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                                isActive
                                    ? "text-brand-600 dark:text-brand-400"
                                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                            )}
                        >
                            <div className={cn(
                                "p-1.5 rounded-xl transition-all",
                                isActive && "bg-brand-50 dark:bg-brand-950/50"
                            )}>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
