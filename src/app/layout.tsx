import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "EPPEN Circular | Descarte inteligente",
  description: "Conectamos descartadores de recicláveis a coletores compatíveis e identificamos oportunidades de agrupamento regional.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
