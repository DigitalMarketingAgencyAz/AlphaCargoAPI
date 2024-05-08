import { registerDecorator, ValidationOptions } from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function IsValidPhoneNumber(
  countries: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false;
          }
          const phoneNumber = parsePhoneNumberFromString(value);
          return phoneNumber && countries.includes(phoneNumber.country);
        },
        defaultMessage() {
          return 'Номер телефона недействителен или не поддерживается';
        },
      },
    });
  };
}
