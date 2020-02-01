import { IsNumber, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiModelProperty()
  @IsNumber()
  public phone: string;

  @ApiModelPropertyOptional()
  @IsDateString()
  public siret: number;
}
