import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value) return value;
    throw new BadRequestException('O valor do parâmetro deve ser informado');
  }
}
