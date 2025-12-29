"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileCheck, Globe, ShieldCheck, FolderClosed, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass border-b border-white/10 px-6 py-4 backdrop-blur-md bg-white/70 dark:bg-slate-950/70">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-brand-600">
              <FolderClosed size={28} strokeWidth={0} className="fill-brand-600" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">MiCarpeta</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Características</a>
            <a href="#pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Precios</a>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden md:inline-flex hover:bg-slate-100 dark:hover:bg-slate-800">Ingresar</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/20">Comenzar Ahora</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-brand-50 to-transparent dark:from-brand-950/20 -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-8 border border-brand-100 dark:border-brand-800">
              🇮🇹 Tu Ciudadanía, Paso a Paso
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6 text-balance">
              Organiza tu camino hacia <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-500">el pasaporte italiano.</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
              Olvídate de las planillas de excel y el caos de papeles. MiCarpeta es tu gestor inteligente para armar, validar y controlar tu trámite consular o judicial.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xl shadow-brand-600/20 hover:scale-105 transition-all">
                Crear mi Carpeta Gratis <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <span className="text-sm text-slate-400">No requiere tarjeta de crédito</span>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas para tu carpeta</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Diseñado por expertos y personas que ya pasaron por el proceso.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={FileCheck}
              title="Gestor Documental"
              description="Sube, organiza y etiqueta tus actas. Evita perder archivos entre carpetas de Google Drive y mails antiguos."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Validador de Fechas"
              description="El sistema detecta automáticamente inconsistencias en las fechas de actas que podrían causar rechazo consular."
            />
            <FeatureCard
              icon={Globe}
              title="Checklist 2025"
              description="Tu hoja de ruta se actualiza automáticamente si cambian las leyes o requisitos del consulado."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Precios Transparentes</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Paga una sola vez por todo el proceso (~8-12 meses). Sin suscripciones mensuales sorpresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Plan Basic */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Plan Validación</h3>
              <p className="text-slate-500 text-sm mb-6">Para quienes solo quieren organizar sus papeles.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">€24.90</span>
                <span className="text-slate-400 text-sm">/pago único</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingItem text="Almacenamiento de Documentos" />
                <PricingItem text="Validación de Fechas (Básico)" />
                <PricingItem text="Exportación a PDF" />
                <PricingItem text="Soporte por Email" />
              </ul>
              <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-slate-300">
                Seleccionar Básico
              </Button>
            </div>

            {/* Plan Premium */}
            <div className="p-8 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white border border-slate-800 shadow-2xl relative overflow-hidden transform md:scale-105">
              <div className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Recomendado
              </div>
              <h3 className="text-xl font-bold mb-2">Plan Gestión Total</h3>
              <p className="text-slate-400 text-sm mb-6">La suite completa para asegurar tu ciudadanía.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-white">€59.90</span>
                <span className="text-brand-200 text-sm">/pago único</span>
              </div>
              <ul className="space-y-4 mb-8">
                <PricingItem text="Todo lo del Plan Básico" light />
                <PricingItem text="Pipeline Inteligente (Paso a Paso)" light />
                <PricingItem text="Control de Vencimientos y Alertas" light />
                <PricingItem text="Guías y Modelos de Email (PEC)" light />
                <PricingItem text="Acceso a Foro Privado" light />
              </ul>
              <Button className="w-full h-12 rounded-xl font-bold bg-brand-600 hover:bg-brand-500 text-white border-0">
                Obtener Acceso Total
              </Button>
              <p className="text-xs text-center text-slate-500 mt-4">Garantía de devolución de 7 días.</p>
            </div>
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

function PricingItem({ text, light = false }: { text: string, light?: boolean }) {
  return (
    <li className={`flex items-start gap-3 text-sm ${light ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>
      <div className={`mt-0.5 rounded-full p-0.5 ${light ? 'bg-brand-500 text-white' : 'bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-400'}`}>
        <Check size={12} strokeWidth={3} />
      </div>
      <span>{text}</span>
    </li>
  );
}
