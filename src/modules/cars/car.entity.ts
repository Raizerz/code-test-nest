import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  AfterLoad
} from 'typeorm';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { Owner } from '../owners/owner.entity';
import { DiscountUtil } from '../../common/utils/discount';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Manufacturer,
    manufacturer => manufacturer.cars,
    {
      eager: true,
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  manufacturer: Manufacturer;

  @Column({ type: 'int', default: 0 })
  price: number;

  @Column({ type: 'date' })
  firstRegistrationDate: Date;

  @OneToMany(
    () => Owner,
    owner => owner.carId,
    {
      eager: true,
    }
  )
  owners: Owner[];
  
  @Column({ type: 'float', nullable: true })
  discount: number;

  @AfterLoad()
  addDiscount() {
    if (!this.discount) {
      this.discount = DiscountUtil.getDiscount(this.firstRegistrationDate);
    }
  }

}