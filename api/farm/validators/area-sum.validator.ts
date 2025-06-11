import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function IsAreaSumValid(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isAreaSumValid",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const totalArea = typeof obj.totalArea === "number"
            ? obj.totalArea
            : parseFloat(obj.totalArea);
          const arableArea = typeof obj.arableArea === "number"
            ? obj.arableArea
            : parseFloat(obj.arableArea);
          const vegetationArea = typeof obj.vegetationArea === "number"
            ? obj.vegetationArea
            : parseFloat(obj.vegetationArea);
          if (isNaN(totalArea) || isNaN(arableArea) || isNaN(vegetationArea)) {
            return false;
          }
          return arableArea + vegetationArea <= totalArea;
        },
        defaultMessage(args: ValidationArguments) {
          return `Sum of arableArea and vegetationArea must not exceed totalArea`;
        },
      },
    });
  };
}
