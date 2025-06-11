import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: "Brain Agriculture API",
      version: "1.0.0",
      description: "A comprehensive agriculture management system API",
      endpoints: {
        producers: "/producer - Manage agricultural producers",
        farms: "/farm - Manage farms and their properties",
        harvests: "/harvest - Manage harvest records",
        crops: "/crop - Manage crop information",
        dashboard: "/dashboard - Get agriculture analytics and insights",
      },
      dataStructure: {
        producer: {
          id: "string (UUID)",
          cpfCnpj: "string (unique CPF/CNPJ)",
          name: "string",
          farms: "Farm[] (related farms)",
        },
        farm: {
          id: "string (UUID)",
          name: "string",
          city: "string",
          state: "string",
          totalArea: "number (hectares)",
          arableArea: "number (hectares)",
          vegetationArea: "number (hectares)",
          producerId: "string (UUID)",
        },
        harvest: {
          id: "string (UUID)",
          year: "string",
          farmId: "string (UUID)",
          crops: "Crop[] (related crops)",
        },
        crop: {
          id: "string (UUID)",
          name: "string",
          harvestId: "string (UUID)",
        },
      },
    };
  }

  getHealth() {
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "Brain Agriculture API",
      version: "1.0.0",
    };
  }
}
