import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import type { CreateHarvestDto } from "./dto/create-harvest.dto.ts";
import type { UpdateHarvestDto } from "./dto/update-harvest.dto.ts";
import { HarvestService } from "./harvest.service.ts";

@Controller("harvest")
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  create(@Body() data: CreateHarvestDto) {
    return this.harvestService.create(data);
  }

  @Get()
  findAll() {
    return this.harvestService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.harvestService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: UpdateHarvestDto) {
    return this.harvestService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.harvestService.remove(id);
  }
}
