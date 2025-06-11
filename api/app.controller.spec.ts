import { AppController } from "@/app.controller.ts";
import { AppService } from "@/app.service.ts";
import { Test, type TestingModule } from "@nestjs/testing";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return API information", () => {
      const result = appController.getApiInfo();
      expect(result).toHaveProperty("name", "Brain Agriculture API");
      expect(result).toHaveProperty("version", "1.0.0");
      expect(result).toHaveProperty("endpoints");
      expect(result).toHaveProperty("dataStructure");
    });
  });

  describe("health", () => {
    it("should return health status", () => {
      const result = appController.getHealth();
      expect(result).toHaveProperty("status", "healthy");
      expect(result).toHaveProperty("service", "Brain Agriculture API");
      expect(result).toHaveProperty("timestamp");
    });
  });
});
