import { PrismaService } from "@/prisma/prisma.service.ts";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getTotalFarms(): Promise<number> {
    return await this.prisma.farm.count();
  }

  async getTotalHectares(): Promise<number> {
    const result = await this.prisma.farm.aggregate({
      _sum: {
        totalArea: true,
      },
    });
    return result._sum.totalArea || 0;
  }

  async getAreaByState(): Promise<{ state: string; totalArea: number }[]> {
    const result = await this.prisma.farm.groupBy({
      by: ["state"],
      _sum: {
        totalArea: true,
      },
    });
    return result.map((item) => ({
      state: item.state,
      totalArea: item._sum.totalArea || 0,
    }));
  }

  async getAreaBySoilUse(): Promise<
    { arableArea: number; vegetationArea: number }
  > {
    const result = await this.prisma.farm.aggregate({
      _sum: {
        arableArea: true,
        vegetationArea: true,
      },
    });
    return {
      arableArea: result._sum.arableArea || 0,
      vegetationArea: result._sum.vegetationArea || 0,
    };
  }

  async getCropsCount(): Promise<{ crop: string; count: number }[]> {
    const result = await this.prisma.crop.groupBy({
      by: ["name"],
      _count: {
        name: true,
      },
    });
    return result.map((item) => ({
      crop: item.name,
      count: item._count.name,
    }));
  }

  async getDashboardData() {
    const totalFarms = await this.getTotalFarms();
    const totalHectares = await this.getTotalHectares();
    const areaByState = await this.getAreaByState();
    const areaBySoilUse = await this.getAreaBySoilUse();
    const cropsCount = await this.getCropsCount();

    return {
      totalFarms,
      totalHectares,
      areaByState,
      areaBySoilUse,
      cropsCount,
    };
  }
}
