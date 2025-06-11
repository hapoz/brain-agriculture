import { AppController } from "@/app.controller.ts";
import { AppService } from "@/app.service.ts";
import { CropModule } from "@/crop/crop.module.ts";
import { DashboardModule } from "@/dashboard/dashboard.module.ts";
import { FarmModule } from "@/farm/farm.module.ts";
import { HarvestModule } from "@/harvest/harvest.module.ts";
import { PrismaModule } from "@/prisma/prisma.module.ts";
import { ProducerModule } from "@/producer/producer.module.ts";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    PrismaModule,
    ProducerModule,
    FarmModule,
    HarvestModule,
    CropModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
