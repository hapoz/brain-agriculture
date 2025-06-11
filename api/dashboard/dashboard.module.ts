import { PrismaModule } from "@/prisma/prisma.module.ts";
import { Module } from "@nestjs/common";
import { DashboardController } from "./dashboard.controller.ts";
import { DashboardService } from "./dashboard.service.ts";

@Module({
  imports: [PrismaModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
