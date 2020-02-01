import { IsNumber, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  public manufacturerId: number;

  @ApiModelProperty()
  @IsNumber()
  public price: number;

  @ApiModelPropertyOptional()
  @IsNotEmpty()
  @IsDateString()
  public firstRegistrationDate: Date;
}
