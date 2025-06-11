import { IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

export class CreateHarvestDto {
  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  @Length(4, 4, { message: "year must be a four-digit year" })
  year!: string;

  @IsString()
  @IsNotEmpty()
  farmId!: string;
}
