import { IsNumber, IsOptional, IsString, Min } from "class-validator";
import { IsAreaSumValid } from "../validators/area-sum.validator.ts";
import { IsBrazilianState } from "../validators/is-brazilian-state.validator.ts";

export class UpdateFarmDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  @IsBrazilianState({
    message: "state must be a valid Brazilian state abbreviation",
  })
  state?: string;

  @IsNumber()
  @IsOptional()
  @Min(0.0001, { message: "totalArea must be greater than zero" })
  totalArea?: number;

  @IsNumber()
  @IsOptional()
  @Min(0.0001, { message: "arableArea must be greater than zero" })
  @IsAreaSumValid("totalArea", {
    message: "Sum of arableArea and vegetationArea must not exceed totalArea",
  })
  arableArea?: number;

  @IsNumber()
  @IsOptional()
  @Min(0.0001, { message: "vegetationArea must be greater than zero" })
  @IsAreaSumValid("totalArea", {
    message: "Sum of arableArea and vegetationArea must not exceed totalArea",
  })
  vegetationArea?: number;

  @IsString()
  @IsOptional()
  producerId?: string;
}
