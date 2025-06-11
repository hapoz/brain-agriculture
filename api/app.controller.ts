import { AppService } from "@/app.service.ts";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiInfo() {
    return this.appService.getApiInfo();
  }

  @Get("health")
  getHealth() {
    return this.appService.getHealth();
  }
}
