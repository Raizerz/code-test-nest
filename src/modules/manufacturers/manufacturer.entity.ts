import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Car } from '../cars/car.entity';


@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ type: 'int' })
  siret: number;

  @OneToMany(
    type => Car,
    car => car.manufacturer,
  )
  cars: Car[];
}