import { Handlers } from "$fresh/server.ts";

// Mock data - in a real app this would be calculated from the database
const mockProducers = [
  {
    id: "1",
    document: "123.456.789-00",
    name: "João Silva",
    farms: [
      {
        id: "1",
        name: "Fazenda São João",
        city: "Ribeirão Preto",
        state: "São Paulo",
        totalArea: 500,
        arableArea: 400,
        vegetationArea: 100,
        crops: [
          { id: "1", name: "Soja", season: "Safra 2023", hectares: 300 },
          { id: "2", name: "Milho", season: "Safra 2023", hectares: 100 },
        ],
      },
    ],
  },
  {
    id: "2",
    document: "12.345.678/0001-90",
    name: "Maria Santos",
    farms: [
      {
        id: "2",
        name: "Fazenda Boa Vista",
        city: "Londrina",
        state: "Paraná",
        totalArea: 800,
        arableArea: 600,
        vegetationArea: 200,
        crops: [
          { id: "3", name: "Café", season: "Safra 2023", hectares: 400 },
          {
            id: "4",
            name: "Cana-de-açúcar",
            season: "Safra 2023",
            hectares: 200,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    document: "987.654.321-00",
    name: "Pedro Oliveira",
    farms: [
      {
        id: "3",
        name: "Fazenda Santa Clara",
        city: "Cuiabá",
        state: "Mato Grosso",
        totalArea: 1200,
        arableArea: 900,
        vegetationArea: 300,
        crops: [
          { id: "5", name: "Soja", season: "Safra 2023", hectares: 600 },
          { id: "6", name: "Milho", season: "Safra 2023", hectares: 300 },
        ],
      },
      {
        id: "4",
        name: "Fazenda Nova Esperança",
        city: "Rondonópolis",
        state: "Mato Grosso",
        totalArea: 600,
        arableArea: 450,
        vegetationArea: 150,
        crops: [
          { id: "7", name: "Algodão", season: "Safra 2023", hectares: 300 },
          { id: "8", name: "Soja", season: "Safra 2023", hectares: 150 },
        ],
      },
    ],
  },
];

function calculateDashboardStats() {
  const allFarms = mockProducers.flatMap((producer) => producer.farms);
  const allCrops = allFarms.flatMap((farm) => farm.crops);

  // Calculate totals
  const totalFarms = allFarms.length;
  const totalHectares = allFarms.reduce((sum, farm) => sum + farm.totalArea, 0);

  // State distribution
  const stateCounts = new Map<string, number>();
  allFarms.forEach((farm) => {
    stateCounts.set(farm.state, (stateCounts.get(farm.state) || 0) + 1);
  });
  const stateDistribution = Array.from(stateCounts.entries())
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count);

  // Crop distribution
  const cropHectares = new Map<string, number>();
  allCrops.forEach((crop) => {
    cropHectares.set(
      crop.name,
      (cropHectares.get(crop.name) || 0) + crop.hectares,
    );
  });
  const cropDistribution = Array.from(cropHectares.entries())
    .map(([crop, hectares]) => ({ crop, hectares }))
    .sort((a, b) => b.hectares - a.hectares);

  // Land use distribution
  const totalArableArea = allFarms.reduce(
    (sum, farm) => sum + farm.arableArea,
    0,
  );
  const totalVegetationArea = allFarms.reduce(
    (sum, farm) => sum + farm.vegetationArea,
    0,
  );
  const landUseDistribution = [
    { type: "Área Agricultável", hectares: totalArableArea },
    { type: "Área de Vegetação", hectares: totalVegetationArea },
  ];

  return {
    totalFarms,
    totalHectares,
    stateDistribution,
    cropDistribution,
    landUseDistribution,
  };
}

export const handler: Handlers = {
  async GET() {
    try {
      const stats = calculateDashboardStats();

      return new Response(JSON.stringify(stats), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to calculate dashboard stats" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
