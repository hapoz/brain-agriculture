import { PrismaService } from "@/prisma/prisma.service.ts";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class FarmService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const producer = await this.prisma.producer.findUnique({
      where: { id: data.producerId },
    });
    if (!producer) {
      throw new NotFoundException("Producer not found");
    }
    return this.prisma.farm.create({
      data,
      include: {
        producer: true,
        harvests: true,
      },
    });
  }

  findAll() {
    return this.prisma.farm.findMany({
      include: {
        producer: true,
        harvests: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.farm.findUnique({
      where: { id },
      include: {
        producer: true,
        harvests: true,
      },
    });
  }

  async update(id: string, data: any) {
    if (data.producerId) {
      const producer = await this.prisma.producer.findUnique({
        where: { id: data.producerId },
      });
      if (!producer) {
        throw new NotFoundException("Producer not found");
      }
    }
    return this.prisma.farm.update({
      where: { id },
      data,
      include: {
        producer: true,
        harvests: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.farm.delete({
      where: { id },
    });
  }
}
