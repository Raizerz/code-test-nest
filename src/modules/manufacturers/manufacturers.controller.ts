import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

@ApiTags('manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(
    private readonly manufacturersService: ManufacturersService,
  ) {}

  @Post()
  public createManufacturer(
    @Body() dto: CreateManufacturerDto,
  ) {
    return this.manufacturersService.create(dto);
  }

  @Get()
  public getManufacturers() {
    return this.manufacturersService.getList();
  }
}
