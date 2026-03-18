import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NovoVision — Compliance Monitoring",
  description: "NovoVision prototype for Novo Nordisk compliance monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
