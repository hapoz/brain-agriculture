import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import type { CreateProducerDto } from "./dto/create-producer.dto.ts";
import type { UpdateProducerDto } from "./dto/update-producer.dto.ts";
import { ProducerService } from "./producer.service.ts";

@Controller("producer")
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  create(@Body() data: CreateProducerDto) {
    return this.producerService.create(data);
  }

  @Get()
  findAll() {
    return this.producerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.producerService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: UpdateProducerDto) {
    return this.producerService.update(id, data);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.producerService.remove(id);
  }
}
