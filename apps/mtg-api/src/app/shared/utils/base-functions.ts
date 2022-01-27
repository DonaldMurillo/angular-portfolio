import {
  ConflictException,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { DBErrorCode } from '../enums/db-error-code.enum';
import { PostgresError } from '../models/postgres.models';

export async function tryAndSaveEntity<T>(
  item: DeepPartial<T>,
  repository: Repository<T>
): Promise<T> {
  try {
    return await repository.save(item);
  } catch (error: any) {
    //console.log(error)
    tryAndSaveEntityError(error);
  }
}

export function tryAndSaveEntityError(error: any) {
  const postgresError = error as PostgresError;

  if (!postgresError?.code) {
    throw new NotAcceptableException(error);
  } else if (postgresError.code === DBErrorCode.PgUniqueConstraintViolation) {
    const message = postgresError.detail
      ?.split('=')[1]
      .replace('(', '"')
      .replace(')', '"');
    throw new ConflictException(`Duplicate: ${message}`);
  } else if (postgresError.code === DBErrorCode.PgNotNullConstraintViolation) {
    const messageArr = postgresError.driverError.toString()?.split('"');
    throw new NotAcceptableException(
      `Property "${messageArr[1]}" cannot be null`
    );
  } else {
    throw new InternalServerErrorException();
  }
}
