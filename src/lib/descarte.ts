export const regions = [
  { id: "centro", name: "Centro" },
  { id: "pinheiros", name: "Pinheiros" },
  { id: "vila-mariana", name: "Vila Mariana" },
] as const;

export type RegionId = (typeof regions)[number]["id"];

export const materials = [
  { id: "papelao", name: "Papelão", detail: "Caixas limpas e secas", unit: "kg", icon: "box" },
  { id: "pet", name: "Plástico PET", detail: "Garrafas e embalagens", unit: "kg", icon: "bottle" },
  { id: "vidro", name: "Vidro", detail: "Potes e garrafas", unit: "kg", icon: "glass" },
  { id: "oleo", name: "Óleo de cozinha", detail: "Armazenado em garrafa", unit: "L", icon: "drop" },
] as const;

export type MaterialId = (typeof materials)[number]["id"];
export type Material = (typeof materials)[number];

export const collectors = [
  {
    id: "coop-centro",
    name: "Cooperativa Circular",
    description: "Coleta comunitária",
    region: "centro",
    materials: ["papelao", "pet", "vidro", "oleo"],
    distanceKm: 1.2,
    nextWindow: "Amanhã, 9h–12h",
    initials: "CC",
  },
  {
    id: "rede-pinheiros",
    name: "Rede Verde Pinheiros",
    description: "Ponto de triagem parceiro",
    region: "pinheiros",
    materials: ["papelao", "pet", "oleo"],
    distanceKm: 1.8,
    nextWindow: "Sábado, 10h–13h",
    initials: "RV",
  },
  {
    id: "ponto-vila-mariana",
    name: "Ponto Reuso Sul",
    description: "Coletor de bairro",
    region: "vila-mariana",
    materials: ["papelao", "pet", "vidro", "oleo"],
    distanceKm: 2.1,
    nextWindow: "Amanhã, 14h–17h",
    initials: "PR",
  },
  {
    id: "vidro-pinheiros",
    name: "Vidro de Volta",
    description: "Coleta seletiva local",
    region: "pinheiros",
    materials: ["vidro"],
    distanceKm: 2.4,
    nextWindow: "Sexta, 8h–11h",
    initials: "VV",
  },
] as const;

export type Collector = (typeof collectors)[number];

export const groupedVolumes: Record<MaterialId, Record<RegionId, { quantity: number; participants: number }>> = {
  papelao: {
    centro: { quantity: 18, participants: 3 },
    pinheiros: { quantity: 12, participants: 2 },
    "vila-mariana": { quantity: 9, participants: 2 },
  },
  pet: {
    centro: { quantity: 8, participants: 2 },
    pinheiros: { quantity: 14, participants: 4 },
    "vila-mariana": { quantity: 6, participants: 2 },
  },
  vidro: {
    centro: { quantity: 10, participants: 2 },
    pinheiros: { quantity: 7, participants: 2 },
    "vila-mariana": { quantity: 11, participants: 3 },
  },
  oleo: {
    centro: { quantity: 6, participants: 2 },
    pinheiros: { quantity: 4, participants: 1 },
    "vila-mariana": { quantity: 5, participants: 2 },
  },
};

export function formatQuantity(quantity: number, unit: string) {
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(quantity)} ${unit}`;
}
