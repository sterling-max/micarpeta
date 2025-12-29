import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { PwaInstallPrompt } from "@/components/ui/pwa-install-prompt";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MiCarpeta - Ciudadanía Italiana",
  description: "Gestión inteligente de tu proceso de ciudadanía italiana.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 selection:bg-indigo-500/30`}
      >
        {children}
        <Suspense fallback={null}>
          <PwaInstallPrompt />
        </Suspense>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

function ServiceWorkerRegister() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
                if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function() {
                        navigator.serviceWorker.register('/sw.js').then(function(registration) {
                            console.log('ServiceWorker registration successful with scope: ', registration.scope);
                        }, function(err) {
                            console.log('ServiceWorker registration failed: ', err);
                        });
                    });
                }
                `,
      }}
    />
  );
}
