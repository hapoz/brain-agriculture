import { Handlers } from "$fresh/server.ts";

// Mock data - in a real app this would be stored in a database
let producers = [
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
];

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const producer = producers.find((p) => p.id === id);
      if (!producer) {
        return new Response(JSON.stringify({ error: "Producer not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify(producer), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(producers), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async POST(req) {
    try {
      const producerData = await req.json();

      // Validate required fields
      if (!producerData.name || !producerData.document) {
        return new Response(
          JSON.stringify({ error: "Name and document are required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Validate CPF/CNPJ
      const cleanDoc = producerData.document.replace(/\D/g, "");
      if (cleanDoc.length !== 11 && cleanDoc.length !== 14) {
        return new Response(
          JSON.stringify({ error: "Invalid CPF/CNPJ format" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Validate farm areas
      if (producerData.farms) {
        for (const farm of producerData.farms) {
          if (farm.arableArea + farm.vegetationArea > farm.totalArea) {
            return new Response(
              JSON.stringify({
                error:
                  `Farm ${farm.name}: Sum of areas cannot exceed total area`,
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
        }
      }

      const newProducer = {
        ...producerData,
        id: Date.now().toString(),
        farms: producerData.farms || [],
      };

      producers.push(newProducer);

      return new Response(JSON.stringify(newProducer), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async PUT(req) {
    try {
      const url = new URL(req.url);
      const id = url.searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ error: "Producer ID is required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const producerIndex = producers.findIndex((p) => p.id === id);
      if (producerIndex === -1) {
        return new Response(JSON.stringify({ error: "Producer not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      const updateData = await req.json();

      // Validate required fields
      if (!updateData.name || !updateData.document) {
        return new Response(
          JSON.stringify({ error: "Name and document are required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Validate farm areas
      if (updateData.farms) {
        for (const farm of updateData.farms) {
          if (farm.arableArea + farm.vegetationArea > farm.totalArea) {
            return new Response(
              JSON.stringify({
                error:
                  `Farm ${farm.name}: Sum of areas cannot exceed total area`,
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
        }
      }

      const updatedProducer = {
        ...producers[producerIndex],
        ...updateData,
        id: producers[producerIndex].id,
      };

      producers[producerIndex] = updatedProducer;

      return new Response(JSON.stringify(updatedProducer), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  },

  async DELETE(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Producer ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const producerIndex = producers.findIndex((p) => p.id === id);
    if (producerIndex === -1) {
      return new Response(JSON.stringify({ error: "Producer not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    producers = producers.filter((p) => p.id !== id);

    return new Response(
      JSON.stringify({ message: "Producer deleted successfully" }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};
