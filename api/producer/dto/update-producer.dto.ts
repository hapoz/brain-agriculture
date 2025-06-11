import { IsOptional, IsString } from "class-validator";
import { IsCpfCnpj } from "../validators/is-cpf-cnpj.validator.ts";

export class UpdateProducerDto {
  @IsString()
  @IsOptional()
  @IsCpfCnpj({ message: "cpfCnpj must be a valid CPF or CNPJ" })
  cpfCnpj?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
