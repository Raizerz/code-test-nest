import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public manufacturerId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  public price: number;
}
