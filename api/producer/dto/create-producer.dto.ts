import { IsNotEmpty, IsString } from "class-validator";
import { IsCpfCnpj } from "../validators/is-cpf-cnpj.validator.ts";

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  @IsCpfCnpj({ message: "cpfCnpj must be a valid CPF or CNPJ" })
  cpfCnpj!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
