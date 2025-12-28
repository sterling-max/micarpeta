import { MobileNav } from "@/components/layout/mobile-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen pb-24">
            <main className="container max-w-md mx-auto p-4 space-y-6">
                {children}
            </main>
            <MobileNav />
        </div>
    );
}
