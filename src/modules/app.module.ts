import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';
import { OwnersModule } from './owners/owners.module';
import { Car } from './cars/car.entity';
import { Manufacturer } from './manufacturers/manufacturer.entity';
import { Owner } from './owners/owner.entity';
import { Scheduler } from '../common/services/Scheduler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [Car, Manufacturer, Owner],
    }),
    CarsModule,
    OwnersModule,
  ],
  providers: [Scheduler],
})
export class AppModule {}
