"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileCheck, Globe, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">MiCarpeta</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Características</a>
            <a href="#how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Cómo funciona</a>
            <a href="#pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Precios</a>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden md:inline-flex">Ingresar</Button>
            </Link>
            <Link href="/register">
              <Button>Comenzar Ahora</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-brand-100/50 to-transparent dark:from-brand-950/30 -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300 text-sm font-medium mb-6 border border-brand-200 dark:border-brand-800">
              🇮🇹 Reforma 2025 Ready
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 text-balance">
              Tu Ciudadanía Italiana, <br />
              <span className="text-brand-600 dark:text-brand-400">Organizada y Simple.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
              La plataforma inteligente que te guía paso a paso en el armado de tu carpeta consular o judicial. Validaciones automáticas, checklist actualizado y gestión de documentos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                Empezar mi trámite <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#demo" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                Ver Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FileCheck}
              title="Gestión de Actas"
              description="Control total de tus actas de nacimiento, matrimonio y defunción. Sabrás exactamente qué te falta y dónde pedirlo."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Validador Inteligente"
              description="Nuestro sistema verifica fechas y consistencias automáticamente para evitar rechazos en el consulado."
            />
            <FeatureCard
              icon={Globe}
              title="Siempre Actualizado"
              description="Reglas ajustadas a la última normativa 2025. Si la ley cambia, tu checklist se actualiza."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © 2025 MiCarpeta. Todos los derechos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-brand-600">Términos</a>
            <a href="#" className="text-slate-500 hover:text-brand-600">Privacidad</a>
            <a href="#" className="text-slate-500 hover:text-brand-600">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 transition-colors group">
      <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-brand-600" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
