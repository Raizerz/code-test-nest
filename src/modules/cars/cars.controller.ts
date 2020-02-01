import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Manufacturer } from '../manufacturers/manufacturer.entity';

@ApiBearerAuth()
@ApiUseTags('cars')
@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
  ) {}

  @Post()
  public createCar(
    @Body() dto: CreateCarDto,
  ) {
    return this.carsService.create(dto);
  }

  @Get()
  public getList() {
    return this.carsService.fetchList();
  }


  @Get(':id')
  public getOneById(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return this.carsService.getOneById(id);
  }

  @Patch(':id')
  public updateCar(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UpdateCarDto,
  ) {
    return this.carsService.update(id, dto);
  }

  @Delete(':id')
  public deleteCar(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    return this.carsService.delete(id);
  }

  @Get(':id/manufacturer')
  public getCarManufacturer(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<Manufacturer> {
    return this.carsService.getCarManufacturer(id);
  }
}
