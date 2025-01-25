import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min, validateSync } from 'class-validator';

export class EnvValidation {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(65535)
  API_GATEWAY_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvValidation, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
