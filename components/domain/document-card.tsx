"use client";

import { DocumentRequirement } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { FileUp, FileCheck, AlertCircle, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DocumentCardProps {
    document: DocumentRequirement;
    onUpload: (file: File) => void;
}

export function DocumentCard({ document, onUpload }: DocumentCardProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onUpload(acceptedFiles[0]);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.png', '.jpg', '.jpeg']
        }
    });

    const isUploaded = !!document.attachmentUrl;

    return (
        <GlassCard className="overflow-hidden p-0">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                            {document.name}
                        </h3>
                        {document.isMandatory && (
                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium uppercase">
                                Obligatorio
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {document.description}
                    </p>
                    {document.country && (
                        <p className="text-xs text-slate-400 mt-1">
                            Emisión: {document.country}
                        </p>
                    )}
                </div>
                {isUploaded ? (
                    <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <FileCheck size={18} />
                    </div>
                ) : (
                    <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <AlertCircle size={18} />
                    </div>
                )}
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-900/50 p-4">
                {isUploaded ? (
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-4 h-4 mr-2" /> Ver Documento
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Eliminar
                        </Button>
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
                            isDragActive
                                ? "border-brand-500 bg-brand-50/50"
                                : "border-slate-200 dark:border-slate-700 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                    >
                        <input {...getInputProps()} />
                        <div className="h-10 w-10 bg-brand-100 dark:bg-brand-900/30 text-brand-600 rounded-full flex items-center justify-center mb-3">
                            <FileUp size={20} />
                        </div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isDragActive ? "Suelta el archivo aquí" : "Subir archivo"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            PDF o JPG hasta 10MB
                        </p>
                    </div>
                )}
            </div>
        </GlassCard>
    );
}
