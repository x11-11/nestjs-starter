import { Injectable, BadRequestException } from '@nestjs/common';

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export function canUse(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'CUSTOM', async: true })
//@Injectable() technically dont have to mark injectable because we dont inject anything
class CustomConstraint implements ValidatorConstraintInterface {
  // constructor() {}
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    return Promise.resolve(value).then((name) => {
      if (name) {
        throw new BadRequestException(`${name} already exists`);
      }
      return true;
    });
  }
}
