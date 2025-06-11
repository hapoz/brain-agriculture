import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

const BRAZILIAN_STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export function IsBrazilianState(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isBrazilianState",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === "string" &&
            BRAZILIAN_STATES.includes(value.toUpperCase());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Brazilian state abbreviation`;
        },
      },
    });
  };
}
