import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

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
      </body>
    </html>
  );
}
