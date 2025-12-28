export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="font-sans antialiased text-slate-900 dark:text-slate-50">
            {children}
        </div>
    );
}
