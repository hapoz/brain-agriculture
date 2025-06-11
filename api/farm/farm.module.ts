import { PrismaModule } from "@/prisma/prisma.module.ts";
import { Module } from "@nestjs/common";
import { FarmController } from "./farm.controller.ts";
import { FarmService } from "./farm.service.ts";

@Module({
  imports: [PrismaModule],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
