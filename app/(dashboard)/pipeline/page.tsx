import { PipelineViewer } from "@/components/domain/pipeline-viewer";

export default function PipelinePage() {
    return (
        <div className="pb-24 px-1 space-y-6">
            <header>
                <h1 className="text-2xl font-bold font-sans">Mi Trámite</h1>
            </header>
            <PipelineViewer />
        </div>
    );
}
