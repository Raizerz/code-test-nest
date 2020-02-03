import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { Car } from '../cars/car.entity';

@Entity('owners')
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  purchaseDate: Date;

  @Column()
  carId: string;

  @ManyToOne(
    type => Car,
    car => car.owners,
  )
  car: Car;
}