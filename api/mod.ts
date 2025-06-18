import { AppModule } from "@/app.module.ts";
import { NestFactory } from "@nestjs/core";
import "@nestjs/platform-express";
import { load } from "@std/dotenv";
import "@std/dotenv/load";

async function bootstrap() {
  // Load environment variables from the api directory
  const env = await load({ envPath: ".env" });
  const app = await NestFactory.create(AppModule);

  // Enable CORS for development, using env variable
  const corsOrigin = Deno.env.get("API_CORS_ORIGIN") ?? "http://localhost:8000";
  console.log(corsOrigin);
  app.enableCors({
    origin: corsOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  await app.listen(env.PORT ?? 3000);
  console.log(`🚀 API server running on port ${env.PORT ?? 3000}`);
}

bootstrap();
