import { AppModule } from "@/app.module.ts";
import { NestFactory } from "@nestjs/core";
import "@nestjs/platform-express";
import { load } from "@std/dotenv";
import "@std/dotenv/load";

async function bootstrap() {
  // Load environment variables from the data directory
  const env = await load({ envPath: "../data/.env" });
  const app = await NestFactory.create(AppModule);

  // Enable CORS for development
  app.enableCors({
    origin: "http://localhost:8000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(env.PORT ?? 3000);
  console.log(`🚀 API server running on port ${env.PORT ?? 3000}`);
}

bootstrap();
