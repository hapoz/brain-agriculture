import { PrismaModule } from "@/prisma/prisma.module.ts";
import { Module } from "@nestjs/common";
import { HarvestController } from "./harvest.controller.ts";
import { HarvestService } from "./harvest.service.ts";

@Module({
  imports: [PrismaModule],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
