"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, ArrowLeft, Check, User, MapPin, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the steps and their data structure
import { usePipeline } from "@/lib/store";
import { OnboardingData } from "@/types";

const INITIAL_DATA: OnboardingData = {
    userName: "",
    avoName: "",
    hasBirthCert: null,
    consulate: "",
};

export default function OnboardingPage() {
    const router = useRouter();
    const generatePipeline = usePipeline((state) => state.generatePipeline);
    const [step, setStep] = useState(0);
    const [data, setData] = useState<OnboardingData>(INITIAL_DATA);

    const updateData = (key: keyof OnboardingData, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (step < steps.length - 1) {
            setStep((s) => s + 1);
        } else {
            // Complete onboarding
            console.log("Onboarding completed:", data);
            generatePipeline(data);
            router.push("/dashboard");
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep((s) => s - 1);
        }
    };

    const steps = [
        {
            id: "welcome",
            component: <WelcomeStep onNext={nextStep} />,
        },
        {
            id: "user-name",
            component: (
                <InputStep
                    question="¿Cómo te llamas?"
                    placeholder="Tu nombre"
                    value={data.userName}
                    onChange={(v) => updateData("userName", v)}
                    onNext={nextStep}
                    icon={User}
                />
            ),
        },
        {
            id: "avo-name",
            component: (
                <InputStep
                    question="¿Cómo se llamaba tu antepasado italiano (AVO)?"
                    placeholder="Giuseppe Verdi"
                    value={data.avoName}
                    onChange={(v) => updateData("avoName", v)}
                    onNext={nextStep}
                    onBack={prevStep}
                    icon={User}
                    description="Necesitamos identificar la raíz de tu ciudadanía."
                />
            ),
        },
        {
            id: "birth-cert",
            component: (
                <SelectionStep
                    question="¿Tienes el acta de nacimiento de tu AVO?"
                    options={[
                        { label: "Sí, la tengo", value: true },
                        { label: "No, todavía no", value: false },
                    ]}
                    value={data.hasBirthCert}
                    onChange={(v) => {
                        updateData("hasBirthCert", v);
                        nextStep();
                    }}
                    onBack={prevStep}
                    icon={FileText}
                    description="Este es el documento más importante para empezar."
                />
            ),
        },
        {
            id: "consulate",
            component: (
                <InputStep
                    question="¿Dónde vas a presentar el trámite?"
                    placeholder="Ej: Consulado de Buenos Aires"
                    value={data.consulate}
                    onChange={(v) => updateData("consulate", v)}
                    onNext={nextStep}
                    onBack={prevStep}
                    icon={MapPin}
                    buttonLabel="Finalizar"
                />
            ),
        },
    ];

    const progress = ((step + 1) / steps.length) * 100;

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-brand-100/40 to-transparent dark:from-brand-950/30 -z-10" />

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-900">
                <motion.div
                    className="h-full bg-brand-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>

            <div className="w-full max-w-lg">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {steps[step].component}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// --- Step Components ---

function WelcomeStep({ onNext }: { onNext: () => void }) {
    return (
        <GlassCard className="text-center py-12 px-8">
            <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🇮🇹</span>
            </div>
            <h1 className="text-3xl font-bold mb-4">Benvenuto!</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg leading-relaxed">
                Vamos a configurar tu carpeta en unos simples pasos para que sepas exactamente qué hacer.
            </p>
            <Button onClick={onNext} size="lg" className="w-full text-lg h-14">
                Comenzar <ArrowRight className="ml-2" />
            </Button>
        </GlassCard>
    );
}

function InputStep({
    question,
    placeholder,
    value,
    onChange,
    onNext,
    onBack,
    icon: Icon,
    description,
    buttonLabel = "Continuar",
}: {
    question: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    onNext: () => void;
    onBack?: () => void;
    icon: any;
    description?: string;
    buttonLabel?: string;
}) {
    return (
        <GlassCard className="py-10 px-8">
            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
            )}

            <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                    <Icon size={24} />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{question}</h2>
                    {description && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {description}
                        </p>
                    )}
                </div>

                <input
                    autoFocus
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full text-center text-xl pb-2 bg-transparent border-b-2 border-slate-200 dark:border-slate-800 focus:border-brand-500 outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700"
                    onKeyDown={(e) => e.key === "Enter" && value && onNext()}
                />

                <Button
                    onClick={onNext}
                    disabled={!value}
                    size="lg"
                    className="w-full h-12 mt-4"
                >
                    {buttonLabel}
                </Button>
            </div>
        </GlassCard>
    );
}

function SelectionStep({
    question,
    options,
    value,
    onChange,
    onBack,
    icon: Icon,
    description,
}: {
    question: string;
    options: { label: string; value: any }[];
    value: any;
    onChange: (v: any) => void;
    onBack?: () => void;
    icon: any;
    description?: string;
}) {
    return (
        <GlassCard className="py-10 px-8">
            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
            )}

            <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                    <Icon size={24} />
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{question}</h2>
                    {description && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {description}
                        </p>
                    )}
                </div>

                <div className="w-full space-y-3 mt-4">
                    {options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => onChange(opt.value)}
                            className={cn(
                                "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group",
                                value === opt.value
                                    ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300"
                                    : "border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700"
                            )}
                        >
                            <span className="font-medium">{opt.label}</span>
                            {value === opt.value && (
                                <CheckCircle2 className="w-5 h-5 text-brand-600" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
}

import { CheckCircle2 } from "lucide-react";
