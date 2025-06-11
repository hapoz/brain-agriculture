import { IsOptional, IsString } from "class-validator";

export class UpdateCropDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  harvestId?: string;
}
