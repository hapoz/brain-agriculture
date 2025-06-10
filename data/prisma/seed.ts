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
    document: "123.456.789-00",
    documentType: "CPF",
    name: "João Silva",
  },
  {
    document: "987.654.321-00",
    documentType: "CPF",
    name: "Maria Santos",
  },
  {
    document: "12.345.678/0001-90",
    documentType: "CNPJ",
    name: "Fazenda São João Ltda",
  },
  {
    document: "98.765.432/0001-10",
    documentType: "CNPJ",
    name: "Agropecuária Verde Ltda",
  },
  {
    document: "111.222.333-44",
    documentType: "CPF",
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
    harvest: "Safra 2023",
  },
  {
    name: "Milho",
    harvest: "Safra 2023",
  },
  {
    name: "Café",
    harvest: "Safra 2023",
  },
  {
    name: "Soja",
    harvest: "Safra 2022",
  },
  {
    name: "Milho",
    harvest: "Safra 2022",
  },
  {
    name: "Café",
    harvest: "Safra 2022",
  },
  {
    name: "Algodão",
    harvest: "Safra 2023",
  },
  {
    name: "Feijão",
    harvest: "Safra 2023",
  },
  {
    name: "Arroz",
    harvest: "Safra 2022",
  },
  {
    name: "Trigo",
    harvest: "Safra 2022",
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
      `Created producer: ${createdProducer.name} (${createdProducer.document})`,
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

  // Create crops and associate with farms
  for (let i = 0; i < cropData.length; i++) {
    const crop = cropData[i];
    const farm = farms[i % farms.length]; // Distribute crops among farms

    const createdCrop = await prisma.crop.create({
      data: {
        ...crop,
        farm: {
          connect: { id: farm.id },
        },
      },
    });
    console.log(
      `Created crop: ${createdCrop.name} - ${createdCrop.harvest} for farm ${farm.name}`,
    );
  }

  console.log("✅ Seeding finished successfully!");
}

// Run the seed function
await seed();
await prisma.$disconnect();
