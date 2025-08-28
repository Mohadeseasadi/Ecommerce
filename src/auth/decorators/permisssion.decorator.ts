import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'pemission';
export const Permisssions = (...params: string[]) =>
  SetMetadata(PERMISSION_KEY, params);
