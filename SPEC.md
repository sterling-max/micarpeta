SPEC.md — Sistema Web Mobile‑First para Gestión del Proceso de Ciudadanía Italiana
1. Overview
Aplicación web mobile‑first diseñada para gestionar el proceso de obtención del reconocimiento de la ciudadanía italiana iure sanguinis, con foco en:
- Recolección y validación de documentos (“la carpeta”).
- Visualización del proceso como un pipeline dinámico, editable y versionable.
- Instalación como PWA para acceso rápido desde dispositivos móviles.
- Componentes UI reutilizables, autoexplicativos y basados en las últimas tecnologías.
- Adaptabilidad a cambios legislativos (muy frecuentes desde la reforma de 2025).

2. Objetivos del Sistema
- Guiar al usuario paso a paso en el proceso de ciudadanía.
- Permitir que cada etapa del pipeline tenga:
- Metadatos
- Documentos requeridos
- Instructivos
- Validaciones
- Dependencias con otras etapas
- Mantener una arquitectura flexible para que cambios en la ley puedan reflejarse sin reescribir la aplicación.
- Ofrecer una experiencia visual moderna, clara y accesible.

3. Tecnologías Principales
3.1 Frontend
- Framework: React / SvelteKit / Next.js (recomendado: SvelteKit por performance mobile-first).
- UI Layer: TailwindCSS + componentes custom.
- State Management: Zustand / Redux Toolkit / Svelte stores.
- Animations: Framer Motion / Motion One.
- PWA:
- Service Worker
- Web App Manifest
- Offline caching (Workbox)
- Instalación en home screen
3.2 Backend
- API: REST o GraphQL (recomendado: GraphQL por flexibilidad).
- Runtime: Node.js (Deno opcional).
- Database: PostgreSQL o MongoDB.
- ORM: Prisma.
- Storage: S3-compatible (documentos, PDFs, imágenes).
- Auth: JWT + OAuth (opcional integración SPID/CIE en futuro).
3.3 Infraestructura
- Hosting: Vercel / Netlify / Fly.io.
- CI/CD: GitHub Actions.
- Monitoring: Sentry + Logtail.

4. Arquitectura General
┌──────────────────────────────┐
│          Frontend            │
│  (PWA + UI Components)       │
└──────────────┬───────────────┘
               │ GraphQL/REST
┌──────────────┴───────────────┐
│            Backend            │
│  (Business Logic + Pipelines) │
└──────────────┬───────────────┘
               │ ORM
┌──────────────┴───────────────┐
│           Database            │
│ (Documents, Pipelines, Users) │
└───────────────────────────────┘



5. Modelo de Datos (Flexible y Versionable)
5.1 Pipeline
Pipeline {
  id: string
  name: string
  version: string
  steps: Step[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}


5.2 Step
Step {
  id: string
  title: string
  description: string
  order: number
  metadata: Record<string, any>
  documents: DocumentRequirement[]
  instructions: Instruction[]
  dependencies: string[] // IDs de otros steps
  status: "pending" | "in_progress" | "completed" | "blocked"
}


5.3 DocumentRequirement
DocumentRequirement {
  id: string
  name: string
  type: "birth" | "marriage" | "death" | "criminal_record" | "apostille" | "translation" | "other"
  country: string
  isMandatory: boolean
  validations: ValidationRule[]
  attachments: File[]
}


5.4 ValidationRule
ValidationRule {
  id: string
  ruleType: "date" | "format" | "presence" | "consistency" | "external_api"
  config: Record<string, any>
}


5.5 Instruction
Instruction {
  id: string
  title: string
  content: string // Markdown
  links: string[]
}



6. Cambios Legislativos 2025 (Resumen Técnico)
Nota: No doy asesoramiento legal; esto es un resumen técnico para modelar el sistema.

A fines de 2025 se introdujeron modificaciones relevantes:
6.1 Nuevos requisitos
- Certificado de assenza di rinuncia emitido digitalmente (API del Ministero dell’Interno).
- Validación cruzada de fechas entre actas (nueva regla de consistencia).
- Apostilla obligatoria para documentos emitidos fuera de la UE (antes había excepciones).
- Traducciones deben ser:
- juradas en Italia, o
- certificadas por traductor habilitado en país de origen.
6.2 Cambios en el orden del proceso
- Antes: recolección → apostilla → traducción → carpeta final.
- Ahora:
- Recolección
- Validación preliminar
- Apostilla
- Traducción
- Validación final
- Presentación
6.3 Nuevos metadatos requeridos
- Fecha de emisión del documento (máximo 6 meses para algunos certificados).
- País de origen (para reglas de apostilla).
- Tipo de traducción.
6.4 Implicación técnica
El pipeline debe ser versionable, permitiendo:
- Cambiar orden de steps.
- Agregar o quitar documentos.
- Modificar reglas de validación.
- Activar/desactivar pipelines según año o jurisdicción.

7. Componentes UI (Reusables y Autoexplicativos)
7.1 PipelineViewer
- Vista principal.
- Muestra steps como tarjetas conectadas.
- Animaciones suaves.
- Estados visuales:
- Pending: gris
- In progress: azul
- Completed: verde
- Blocked: rojo
7.2 DocumentCard
- Nombre del documento.
- Estado (faltante, cargado, validado).
- Botón “Subir archivo”.
- Tooltip con instructivo.
7.3 InstructionModal
- Contenido en Markdown.
- Links externos.
- Botón “Marcar como leído”.
7.4 MetadataForm
- Campos dinámicos según reglas.
- Validaciones en tiempo real.
7.5 FileUploader
- Drag & drop.
- Compresión automática.
- Previsualización.
7.6 Timeline
- Representación cronológica del proceso.
- Ideal para usuarios no técnicos.

8. UX / UI Guidelines
- Mobile-first:
- Layout vertical
- Botones grandes
- Gestos táctiles
- Colores suaves, estilo “neoglass” o “soft UI”.
- Iconografía clara (Lucide Icons).
- Microinteracciones (haptic feedback opcional en móviles).
- Modo oscuro automático.

9. Seguridad
- Cifrado en tránsito (HTTPS).
- Cifrado en reposo (AES-256 para documentos).
- Control de acceso por roles.
- Auditoría de cambios en pipelines.

10. Roadmap
MVP
- Pipeline estático versión 2025.
- Subida de documentos.
- Validaciones básicas.
- PWA instalable.
v1.1
- Pipeline editable desde panel admin.
- Versionado de pipelines.
- Validaciones avanzadas.
v2.0
- Integración con APIs oficiales italianas.
- Generación automática de carpeta final en PDF.
- Notificaciones push

---------------------------


# Diagrama de Flujo — Proceso Legal de Ciudadanía Italiana (2025)  
Inicio → Verificación de elegibilidad (confirmación de línea sanguínea, ausencia de naturalización previa, revisión preliminar de actas disponibles) → Recolección de documentos (actas de nacimiento, matrimonio, defunción, certificados complementarios, documentos de identidad, constancias de no naturalización, según país y línea familiar) → Validación preliminar (control de coherencia entre fechas, nombres, lugares; detección de errores comunes; verificación de requisitos según la reforma 2025) → Solicitud de certificados adicionales (incluye el nuevo “certificado digital de assenza di rinuncia” emitido por el Ministero dell’Interno; validación cruzada con bases de datos italianas cuando aplica) → Apostilla de documentos extranjeros (obligatoria para todos los documentos extra‑UE según la reforma 2025; verificación de autoridad emisora; control de vigencia) → Traducción oficial (traducción jurada en Italia o certificada por traductor habilitado en país de origen; control de correspondencia entre texto original y traducido; metadatos de traductor) → Validación final de carpeta (revisión integral de documentos, consistencia entre actas, control de fechas máximas de validez, verificación de requisitos específicos por comuna o consulado) → Preparación de carpeta final (ordenamiento, digitalización, generación de checklist, carga en sistema interno) → Presentación ante Comune o Consulado (turno, entrega física o digital, registro de protocolo) → Evaluación por autoridad italiana (verificación interna, eventuales pedidos de integración, tiempos variables según jurisdicción) → Resolución (reconocimiento, rechazo o solicitud de documentación adicional) → En caso de reconocimiento: inscripción en AIRE o registro local, emisión de acta de nacimiento italiana, habilitación para solicitar pasaporte → Fin.  