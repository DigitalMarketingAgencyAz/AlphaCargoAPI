"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidPhoneNumber = void 0;
const class_validator_1 = require("class-validator");
const libphonenumber_js_1 = require("libphonenumber-js");
function IsValidPhoneNumber(countries, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'isValidPhoneNumber',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (typeof value !== 'string') {
                        return false;
                    }
                    const phoneNumber = (0, libphonenumber_js_1.parsePhoneNumberFromString)(value);
                    return phoneNumber && countries.includes(phoneNumber.country);
                },
                defaultMessage() {
                    return 'Номер телефона недействителен или не поддерживается';
                },
            },
        });
    };
}
exports.IsValidPhoneNumber = IsValidPhoneNumber;
//# sourceMappingURL=is-valid-number.decorator.js.map