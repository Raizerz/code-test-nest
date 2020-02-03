import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { Manufacturer } from './manufacturer.entity';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepo: Repository<Manufacturer>,
  ) {}

  public create(dto: CreateManufacturerDto): Promise<Manufacturer> {
    const manufacturer = this.manufacturerRepo.create(dto);
    return this.manufacturerRepo.save(manufacturer);
  }

  public getList(): Promise<Manufacturer[]> {
    return this.manufacturerRepo.find();
  }

  public getOneById(id: number): Promise<Manufacturer> {
    return this.manufacturerRepo.findOne(id);
  }
}
