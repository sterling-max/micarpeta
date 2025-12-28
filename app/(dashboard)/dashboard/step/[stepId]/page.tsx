import { StepDetailView } from "@/components/domain/step-detail-view";

export default async function StepPage(props: { params: Promise<{ stepId: string }> }) {
    const params = await props.params;

    return (
        <div className="pb-8">
            <StepDetailView stepId={params.stepId} />
        </div>
    );
}
