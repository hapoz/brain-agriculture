import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CropService } from "./crop.service.ts";
import type { CreateCropDto } from "./dto/create-crop.dto.ts";
import type { UpdateCropDto } from "./dto/update-crop.dto.ts";

@Controller("crop")
export class CropController {
  constructor(private readonly cropService: CropService) {}

  @Post()
  create(@Body() data: CreateCropDto) {
    return this.cropService.create(data);
  }

  @Get()
  findAll() {
    return this.cropService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cropService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: UpdateCropDto) {
    return this.cropService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cropService.remove(id);
  }
}
