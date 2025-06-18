import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import type { CreateFarmDto } from "./dto/create-farm.dto.ts";
import type { UpdateFarmDto } from "./dto/update-farm.dto.ts";
import { FarmService } from "./farm.service.ts";

@Controller("farm")
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  create(@Body() data: CreateFarmDto) {
    return this.farmService.create(data);
  }

  @Get()
  findAll() {
    return this.farmService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.farmService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: UpdateFarmDto) {
    return this.farmService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.farmService.remove(id);
  }
}
