import { PrismaService } from "@/prisma/prisma.service.ts";
import { ConflictException, Injectable } from "@nestjs/common";
import type { CreateProducerDto } from "./dto/create-producer.dto.ts";
import type { UpdateProducerDto } from "./dto/update-producer.dto.ts";

@Injectable()
export class ProducerService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProducerDto) {
    try {
      return await this.prisma.producer.create({
        data,
        include: {
          farms: true,
        },
      });
    } catch (error: Error) {
      if (error.code === "P2002") {
        throw new ConflictException("CPF/CNPJ already exists");
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.producer.findMany({
      include: {
        farms: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.producer.findUnique({
      where: { id },
      include: {
        farms: true,
      },
    });
  }

  async update(id: string, data: UpdateProducerDto) {
    const result = await this.prisma.producer.update({
      where: { id },
      data,
      include: {
        farms: true,
      },
    });
    return result;
  }

  async remove(id: string) {
    return await this.prisma.producer.delete({
      where: { id },
    });
  }
}
