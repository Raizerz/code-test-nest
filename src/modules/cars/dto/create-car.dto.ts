import { IsNumber, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public manufacturerId: number;

  @ApiProperty()
  @IsNumber()
  public price: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsDateString()
  public firstRegistrationDate: Date;
}
