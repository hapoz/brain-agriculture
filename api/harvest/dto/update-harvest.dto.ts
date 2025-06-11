import { IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class UpdateHarvestDto {
  @IsString()
  @IsOptional()
  @IsNumberString()
  @Length(4, 4, { message: "year must be a four-digit year" })
  year?: string;

  @IsString()
  @IsOptional()
  farmId?: string;
}
