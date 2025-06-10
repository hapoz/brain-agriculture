import type { HelloService } from "@/hello.service.ts";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Get("/")
  hello() {
    return this.helloService.hello();
  }
}
