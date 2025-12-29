"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck, Download, Trash2, Key } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="pb-24 px-4 space-y-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Privacidad y GDPR</h1>
                <p className="text-slate-500">Cómo protegemos y gestionamos tus datos.</p>
            </header>

            <GlassCard className="prose dark:prose-invert max-w-none">
                <div className="flex items-center gap-3 mb-6 bg-brand-50 dark:bg-brand-900/30 p-4 rounded-xl">
                    <ShieldCheck className="text-brand-600 w-8 h-8" />
                    <div>
                        <h3 className="text-brand-800 dark:text-brand-300 font-bold m-0 p-0 text-base">Cumplimiento GDPR</h3>
                        <p className="text-sm text-brand-600/80 dark:text-brand-400 m-0 p-0">Sus datos están protegidos bajo estándares europeos de privacidad.</p>
                    </div>
                </div>

                <h3>1. Recolección de Datos</h3>
                <p>
                    Recopilamos únicamente la información necesaria para gestionar su trámite de ciudadanía (documentos, nombres de familiares, datos de contacto). Estos datos son sensibles y se tratan con la máxima confidencialidad.
                </p>

                <h3>2. Uso de la Información</h3>
                <p>
                    Su información se utiliza exclusivamente para:
                </p>
                <ul>
                    <li>Generar su hoja de ruta personalizada.</li>
                    <li>Validar sus documentos respecto a los requisitos consulares.</li>
                    <li>Realizar copias de seguridad de sus documentos.</li>
                </ul>
                <p><strong>No compartimos sus datos con terceros sin su consentimiento explícito.</strong></p>

                <h3>3. Sus Derechos (GDPR)</h3>
                <p>Como usuario, usted tiene derecho a:</p>
                <ul>
                    <li><strong>Acceso:</strong> Solicitar una copia de todos los datos que tenemos sobre usted.</li>
                    <li><strong>Rectificación:</strong> Corregir cualquier dato erróneo.</li>
                    <li><strong>Olvido (Borrado):</strong> Solicitar la eliminación total de su cuenta y documentos de nuestros servidores.</li>
                    <li><strong>Portabilidad:</strong> Descargar sus datos en un formato legible.</li>
                </ul>

                <h3 className="text-red-600">4. Zona de Control de Datos</h3>
                <div className="not-prose grid gap-4 mt-4">
                    <button className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-left group">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white text-slate-600">
                                <Download size={20} />
                            </div>
                            <div>
                                <span className="font-semibold block text-slate-900">Descargar mis datos</span>
                                <span className="text-xs text-slate-500">Obtener copia en JSON/ZIP</span>
                            </div>
                        </div>
                    </button>
                    <button className="flex items-center justify-between p-4 border border-red-200 bg-red-50/50 rounded-xl hover:bg-red-50 transition-colors text-left group">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 p-2 rounded-lg group-hover:bg-white text-red-600">
                                <Trash2 size={20} />
                            </div>
                            <div>
                                <span className="font-semibold block text-red-900">Eliminar cuenta y datos</span>
                                <span className="text-xs text-red-500">Acción irreversible (Derecho al olvido)</span>
                            </div>
                        </div>
                    </button>
                </div>
            </GlassCard>
        </div>
    );
}
