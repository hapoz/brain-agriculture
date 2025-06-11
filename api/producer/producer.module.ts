import { PrismaModule } from "@/prisma/prisma.module.ts";
import { Module } from "@nestjs/common";
import { ProducerController } from "./producer.controller.ts";
import { ProducerService } from "./producer.service.ts";

@Module({
  imports: [PrismaModule],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
