export type DocumentType =
    | "birth"
    | "marriage"
    | "death"
    | "criminal_record"
    | "apostille"
    | "translation"
    | "other";

export type StepStatus = "pending" | "in_progress" | "completed" | "blocked";

export interface ValidationRule {
    id: string;
    ruleType: "date" | "format" | "presence" | "consistency" | "external_api";
    config: Record<string, any>;
}

export interface DocumentRequirement {
    id: string;
    name: string;
    type: DocumentType;
    country: string;
    isMandatory: boolean;
    validations: ValidationRule[];
    description?: string;
    // attachments: File[] - client side only usually, or represented by URL strings
    attachmentUrl?: string;
}

export interface Instruction {
    id: string;
    title: string;
    content: string; // Markdown
    links: string[];
}

export interface Step {
    id: string;
    title: string;
    description: string;
    order: number;
    metadata: Record<string, any>;
    documents: DocumentRequirement[];
    instructions: Instruction[];
    dependencies: string[];
    status: StepStatus;
}

export interface User {
    id: string;
    email: string;
    name: string;
    pipelineId?: string;
    preferences?: Record<string, any>;
}

export interface OnboardingData {
    userName: string;
    avoName: string;
    hasBirthCert: boolean | null;
    consulate: string;
}

export interface Pipeline {
    id: string;
    userId: string;
    name: string;
    version: string;
    steps: Step[];
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}
