import type { Metadata } from "next";
import DescarteFlow from "./DescarteFlow";

export const metadata: Metadata = {
  title: "Descarte inteligente | EPPEN",
  description: "Encontre uma oportunidade demonstrativa de coleta para seus materiais.",
};

type DescartePageProps = {
  searchParams: Promise<{ origem?: string | string[] }>;
};

export default async function DescartePage({ searchParams }: DescartePageProps) {
  const params = await searchParams;
  const origin = Array.isArray(params.origem) ? params.origem[0] : params.origem;

  return <DescarteFlow origin={origin === "folder" ? "folder" : undefined} />;
}
