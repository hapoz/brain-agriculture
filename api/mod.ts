import { AppModule } from "@/app.module.ts";
import { NestFactory } from "@nestjs/core";
import "@nestjs/platform-express";

const app = await NestFactory.create(AppModule);

app.listen(3000);
