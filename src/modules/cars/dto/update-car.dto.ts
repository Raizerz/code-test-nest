import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiModelProperty()
  @IsString()
  @IsOptional()
  public manufacturerId: string;

  @ApiModelProperty()
  @IsNumber()
  @IsOptional()
  public price: number;
}
