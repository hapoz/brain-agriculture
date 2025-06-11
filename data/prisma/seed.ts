import { load } from "@std/dotenv";
import "@std/dotenv/load";

import { type Prisma, PrismaClient } from "../generated/prisma/client.ts";

const envVars = await load();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: envVars.DATABASE_URL,
    },
  },
});

// Sample data for producers
const producerData: Prisma.ProducerCreateInput[] = [
  {
    cpfCnpj: "123.456.789-00",
    name: "João Silva",
  },
  {
    cpfCnpj: "987.654.321-00",
    name: "Maria Santos",
  },
  {
    cpfCnpj: "12.345.678/0001-90",
    name: "Fazenda São João Ltda",
  },
  {
    cpfCnpj: "98.765.432/0001-10",
    name: "Agropecuária Verde Ltda",
  },
  {
    cpfCnpj: "111.222.333-44",
    name: "Pedro Oliveira",
  },
];

// Sample data for farms (without producer relation - will be added in seed function)
const farmData = [
  {
    name: "Fazenda Boa Vista",
    city: "Londrina",
    state: "Paraná",
    totalArea: 500.0,
    arableArea: 350.0,
    vegetationArea: 150.0,
  },
  {
    name: "Sítio São José",
    city: "Ribeirão Preto",
    state: "São Paulo",
    totalArea: 200.0,
    arableArea: 150.0,
    vegetationArea: 50.0,
  },
  {
    name: "Fazenda Santa Clara",
    city: "Uberlândia",
    state: "Minas Gerais",
    totalArea: 800.0,
    arableArea: 600.0,
    vegetationArea: 200.0,
  },
  {
    name: "Rancho Alegre",
    city: "Goiânia",
    state: "Goiás",
    totalArea: 300.0,
    arableArea: 200.0,
    vegetationArea: 100.0,
  },
  {
    name: "Fazenda Nova Esperança",
    city: "Cascavel",
    state: "Paraná",
    totalArea: 400.0,
    arableArea: 280.0,
    vegetationArea: 120.0,
  },
  {
    name: "Sítio Bela Vista",
    city: "Campinas",
    state: "São Paulo",
    totalArea: 150.0,
    arableArea: 100.0,
    vegetationArea: 50.0,
  },
];

// Sample data for crops (without farm relation - will be added in seed function)
const cropData = [
  {
    name: "Soja",
    harvestYear: "Safra 2023",
  },
  {
    name: "Milho",
    harvestYear: "Safra 2023",
  },
  {
    name: "Café",
    harvestYear: "Safra 2023",
  },
  {
    name: "Soja",
    harvestYear: "Safra 2022",
  },
  {
    name: "Milho",
    harvestYear: "Safra 2022",
  },
  {
    name: "Café",
    harvestYear: "Safra 2022",
  },
  {
    name: "Algodão",
    harvestYear: "Safra 2023",
  },
  {
    name: "Feijão",
    harvestYear: "Safra 2023",
  },
  {
    name: "Arroz",
    harvestYear: "Safra 2022",
  },
  {
    name: "Trigo",
    harvestYear: "Safra 2022",
  },
];

/**
 * Seed the database with agriculture data.
 */
async function seed() {
  console.log("🌱 Starting database seeding...");

  // Create producers
  const producers = [];
  for (const producer of producerData) {
    const createdProducer = await prisma.producer.create({
      data: producer,
    });
    producers.push(createdProducer);
    console.log(
      `Created producer: ${createdProducer.name} (${createdProducer.cpfCnpj})`,
    );
  }

  // Create farms and associate with producers
  const farms = [];
  for (let i = 0; i < farmData.length; i++) {
    const farm = farmData[i];
    const producer = producers[i % producers.length]; // Distribute farms among producers

    const createdFarm = await prisma.farm.create({
      data: {
        ...farm,
        producer: {
          connect: { id: producer.id },
        },
      },
    });
    farms.push(createdFarm);
    console.log(
      `Created farm: ${createdFarm.name} in ${createdFarm.city}, ${createdFarm.state}`,
    );
  }

  // Create harvests for each farm
  const harvests = [];
  for (const farm of farms) {
    // Create harvests for different years
    const harvestYears = ["Safra 2022", "Safra 2023"];

    for (const year of harvestYears) {
      const createdHarvest = await prisma.harvest.create({
        data: {
          year: year,
          farm: {
            connect: { id: farm.id },
          },
        },
      });
      harvests.push(createdHarvest);
      console.log(
        `Created harvest: ${createdHarvest.year} for farm ${farm.name}`,
      );
    }
  }

  // Create crops and associate with harvests
  for (let i = 0; i < cropData.length; i++) {
    const crop = cropData[i];
    const harvest = harvests.find((h) => h.year === crop.harvestYear);

    if (harvest) {
      const createdCrop = await prisma.crop.create({
        data: {
          name: crop.name,
          harvest: {
            connect: { id: harvest.id },
          },
        },
      });
      console.log(
        `Created crop: ${createdCrop.name} for harvest ${harvest.year}`,
      );
    }
  }

  console.log("✅ Seeding finished successfully!");
}

// Run the seed function
await seed();
await prisma.$disconnect();
