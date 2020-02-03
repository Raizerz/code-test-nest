import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './car.entity';
import { ManufacturersService } from '../manufacturers/manufacturers.service';
import { Manufacturer } from '../manufacturers/manufacturer.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepo: Repository<Car>,
    private readonly manufacturersService: ManufacturersService,
  ) {}

  public async create(dto: CreateCarDto): Promise<Car> {
    const manufacturer = await this.manufacturersService.getOneById(dto.manufacturerId);
    if (!manufacturer) {
      throw new BadRequestException(`Manufacturer with id: ${dto.manufacturerId} not found`);
    }
    const car = this.carRepo.create(dto);
    car.manufacturer = manufacturer;
    return this.carRepo.save(car);
  }

  public async fetchList(): Promise<Car[]> {
    return this.carRepo.find();
  }

  public async getOneById(id: number): Promise<Car> {
    const car = await this.carRepo.findOne(id);
    if (!car) {
      throw new NotFoundException(`Car with id: ${id} not found`);
    }
    return car;
  }

  public async update(id: number, dto: UpdateCarDto): Promise<Car> {
    const { affected } = await this.carRepo.update(id, dto);
    if (affected === 0) {
      throw new NotFoundException(`Car with id: ${id} not found`);
    }
    return this.carRepo.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const { affected } = await this.carRepo.delete(id);
    if (affected === 0) {
      throw new NotFoundException(`Car with id: ${id} not found`);
    }
  }

  async getCarManufacturer(id: number): Promise<Manufacturer> {
    const car = await this.carRepo.findOne(id);
    if (!car) {
      throw new NotFoundException(`Car with id: ${id} not found`);
    }
    return car.manufacturer;
  }
}
