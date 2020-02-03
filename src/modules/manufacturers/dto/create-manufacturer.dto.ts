import { IsNumber, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsNumber()
  public phone: string;

  @ApiPropertyOptional()
  @IsDateString()
  public siret: number;
}
