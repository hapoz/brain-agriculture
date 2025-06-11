import { PrismaService } from "@/prisma/prisma.service.ts";
import { Injectable } from "@nestjs/common";
import type { CreateHarvestDto } from "./dto/create-harvest.dto.ts";

@Injectable()
export class HarvestService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateHarvestDto) {
    return this.prisma.harvest.create({
      data,
      include: {
        farm: true,
        crops: true,
      },
    });
  }

  findAll() {
    return this.prisma.harvest.findMany({
      include: {
        farm: true,
        crops: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.harvest.findUnique({
      where: { id },
      include: {
        farm: true,
        crops: true,
      },
    });
  }

  update(id: string, data: any) {
    return this.prisma.harvest.update({
      where: { id },
      data,
      include: {
        farm: true,
        crops: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.harvest.delete({
      where: { id },
    });
  }
}
