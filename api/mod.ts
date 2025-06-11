import { AppModule } from "@/app.module.ts";
import { NestFactory } from "@nestjs/core";
import "@nestjs/platform-express";
import { load } from "@std/dotenv";
import "@std/dotenv/load";

async function bootstrap() {
  const env = await load();
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT ?? 3000);
}

bootstrap();
