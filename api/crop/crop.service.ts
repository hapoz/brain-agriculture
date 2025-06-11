import { PrismaService } from "@/prisma/prisma.service.ts";
import { ConflictException, Injectable } from "@nestjs/common";
import { CreateCropDto } from "./dto/create-crop.dto.ts";

@Injectable()
export class CropService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCropDto) {
    const exists = await this.prisma.crop.findFirst({
      where: { harvestId: data.harvestId, name: data.name },
    });
    if (exists) {
      throw new ConflictException(
        "This crop is already registered for this harvest",
      );
    }
    return this.prisma.crop.create({
      data,
      include: {
        harvest: true,
      },
    });
  }

  findAll() {
    return this.prisma.crop.findMany({
      include: {
        harvest: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.crop.findUnique({
      where: { id },
      include: {
        harvest: true,
      },
    });
  }

  async update(id: string, data: any) {
    if (data.harvestId && data.name) {
      const exists = await this.prisma.crop.findFirst({
        where: { harvestId: data.harvestId, name: data.name },
      });
      if (exists && exists.id !== id) {
        throw new ConflictException(
          "This crop is already registered for this harvest",
        );
      }
    }
    return this.prisma.crop.update({
      where: { id },
      data,
      include: {
        harvest: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.crop.delete({
      where: { id },
    });
  }
}
