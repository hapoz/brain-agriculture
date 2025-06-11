import { HelloController } from "@/hello.controller.ts";
import { HelloService } from "@/hello.service.ts";
import { Module } from "@nestjs/common";

@Module({ providers: [HelloService], controllers: [HelloController] })
export class AppModule {}
