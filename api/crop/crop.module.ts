import { PrismaModule } from "@/prisma/prisma.module.ts";
import { Module } from "@nestjs/common";
import { CropController } from "./crop.controller.ts";
import { CropService } from "./crop.service.ts";

@Module({
  imports: [PrismaModule],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
