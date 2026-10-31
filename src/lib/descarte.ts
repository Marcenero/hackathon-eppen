export const regions = [
  { id: "osasco-centro", name: "Centro", municipality: "Osasco" },
  { id: "osasco-presidente-altino", name: "Presidente Altino", municipality: "Osasco" },
  { id: "osasco-quitauna", name: "Quitaúna", municipality: "Osasco" },
  { id: "osasco-vila-yara", name: "Vila Yara", municipality: "Osasco" },
  { id: "osasco-rochdale", name: "Rochdale", municipality: "Osasco" },
  { id: "osasco-jardim-dabril", name: "Jardim D'Abril", municipality: "Osasco" },
  { id: "carapicuiba-centro", name: "Centro", municipality: "Carapicuíba" },
  { id: "barueri-centro", name: "Centro", municipality: "Barueri" },
] as const;

export type RegionId = (typeof regions)[number]["id"];

export const materials = [
  { id: "papelao", name: "Papelão", detail: "Caixas limpas e secas", icon: "box" },
  { id: "pet", name: "Plástico PET", detail: "Garrafas e embalagens", icon: "bottle" },
  { id: "vidro", name: "Vidro", detail: "Potes e garrafas", icon: "glass" },
  { id: "aluminio", name: "Alumínio", detail: "Latas e embalagens", icon: "can" },
] as const;

export type MaterialId = (typeof materials)[number]["id"];
export type Material = (typeof materials)[number];

type RegionVolumes = Record<RegionId, number[]>;

function regionalFixtures(first: number, second: number): RegionVolumes {
  return Object.fromEntries(regions.map(({ id }) => [id, [first, second]])) as RegionVolumes;
}

export const groupedVolumes: Record<MaterialId, RegionVolumes> = {
  papelao: {
    ...regionalFixtures(4, 5),
    "osasco-centro": [12, 10],
  },
  pet: regionalFixtures(6, 5),
  vidro: regionalFixtures(5, 5),
  aluminio: regionalFixtures(4, 3),
};

export type Collector = {
  id: string;
  name: string;
  regionId: RegionId;
  materialIds: MaterialId[];
  minimumKg: Partial<Record<MaterialId, number>>;
};

const collectorCoverage: Array<{
  regionId: RegionId;
  materialIds: MaterialId[];
}> = [
  { regionId: "osasco-centro", materialIds: ["papelao", "pet", "vidro", "aluminio"] },
  { regionId: "osasco-presidente-altino", materialIds: ["papelao", "pet"] },
  { regionId: "osasco-quitauna", materialIds: ["papelao", "vidro"] },
  { regionId: "osasco-vila-yara", materialIds: ["pet", "aluminio"] },
  { regionId: "osasco-rochdale", materialIds: ["papelao", "pet", "aluminio"] },
  { regionId: "osasco-jardim-dabril", materialIds: ["papelao", "vidro"] },
  { regionId: "carapicuiba-centro", materialIds: ["papelao", "pet", "vidro"] },
  { regionId: "barueri-centro", materialIds: ["papelao", "pet"] },
];

export const collectors: Collector[] = collectorCoverage.map(({ regionId, materialIds }, index) => ({
  id: `coletor-demo-${index + 1}`,
  name: `Coletor demonstrativo ${String.fromCharCode(65 + index)}`,
  regionId,
  materialIds,
  minimumKg: {
    ...(materialIds.includes("papelao") ? { papelao: 25 } : {}),
    ...(materialIds.includes("pet") ? { pet: 20 } : {}),
    ...(materialIds.includes("vidro") ? { vidro: 20 } : {}),
    ...(materialIds.includes("aluminio") ? { aluminio: 15 } : {}),
  },
}));

export type MatchResult = {
  status: "eligible" | "insufficient" | "no-collector";
  region: (typeof regions)[number];
  material: Material;
  enteredKg: number;
  groupedKg: number;
  fixtureKg: number;
  fixtureCount: number;
  compatibleCollectors: Collector[];
  eligibleCollectors: Collector[];
  requiredKg: number | null;
};

export function findCollectionMatch(materialId: MaterialId, enteredKg: number, regionId: RegionId): MatchResult {
  const material = materials.find((item) => item.id === materialId) ?? materials[0];
  const region = regions.find((item) => item.id === regionId) ?? regions[0];
  const regionalVolumes = groupedVolumes[materialId][regionId];
  const fixtureKg = regionalVolumes.reduce((total, volume) => total + volume, 0);
  const groupedKg = enteredKg + fixtureKg;
  const compatibleCollectors = collectors.filter(
    (collector) => collector.regionId === regionId && collector.materialIds.includes(materialId),
  );
  const eligibleCollectors = compatibleCollectors.filter(
    (collector) => groupedKg >= (collector.minimumKg[materialId] ?? Number.POSITIVE_INFINITY),
  );
  const requiredKg = compatibleCollectors.length
    ? Math.min(...compatibleCollectors.map((collector) => collector.minimumKg[materialId] ?? Number.POSITIVE_INFINITY))
    : null;

  return {
    status: compatibleCollectors.length === 0 ? "no-collector" : eligibleCollectors.length ? "eligible" : "insufficient",
    region,
    material,
    enteredKg,
    groupedKg,
    fixtureKg,
    fixtureCount: regionalVolumes.length,
    compatibleCollectors,
    eligibleCollectors,
    requiredKg: Number.isFinite(requiredKg) ? requiredKg : null,
  };
}

export function formatQuantity(quantity: number) {
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(quantity)} kg`;
}
