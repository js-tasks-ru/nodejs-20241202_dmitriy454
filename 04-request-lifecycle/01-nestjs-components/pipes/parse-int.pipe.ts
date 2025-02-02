import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const int = parseInt(value);

    if (isNaN(int)) {
      throw new BadRequestException(`"${value}" не является числом`)
    }

    return int;
  }
}
