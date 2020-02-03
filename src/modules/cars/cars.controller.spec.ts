
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Manufacturer } from '../manufacturers/manufacturer.entity';
import { ManufacturersService } from '../manufacturers/manufacturers.service';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';

describe('Cars Controller', () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        { provide: getRepositoryToken(Car), useValue: {} },
        {
          provide: CarsService,
          useValue: {
            fetchList: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            getCarManufacturer: jest.fn(),
          },
        },
        { provide: ManufacturersService, useValue: {} },
      ],
    }).compile();

    carsController = module.get<CarsController>(CarsController);
    carsService = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(carsController).toBeDefined();
    expect(carsService).toBeDefined();
  });

  describe('getCars', () => {
    it('should return array of cars', async () => {
      const testData = [
        {
          id: 123,
          price: 12,
        },
      ] as Car[];

      jest
        .spyOn(carsService, 'fetchList')
        .mockImplementation(() => Promise.resolve(testData));

      expect(await carsController.getList()).toBe(testData);
    });
  });

  describe('createCar', () => {
    it('should return created car', async () => {
      const testCar = {
        id: 123,
      } as Car;

      jest
        .spyOn(carsService, 'create')
        .mockImplementation(() => Promise.resolve(testCar));

      expect(
        await carsController.createCar({
          manufacturerId: 123123,
          firstRegistrationDate: new Date(),
          price: 12,
        }),
      ).toBe(testCar);
    });
  });

  describe('updateCar', () => {
    it('should return updated car', async () => {
      const testCar = {
        id: 123,
      } as Car;

      jest
        .spyOn(carsService, 'update')
        .mockImplementation(() => Promise.resolve(testCar));

      expect(await carsController.updateCar(123, {})).toBe(testCar);
    });
  });

  describe('deleteCar', () => {
    it('should delete car', async () => {
      jest
        .spyOn(carsService, 'delete')
        .mockImplementation(() => Promise.resolve());

      expect(await carsController.deleteCar(123)).toBeUndefined();
    });
  });

  describe('fetchCarManufacturer', () => {
    it('should return manufacturer', async () => {
      const testManufacturer = {
        id: 123123,
      } as Manufacturer;

      jest
        .spyOn(carsService, 'getCarManufacturer')
        .mockImplementation(() => Promise.resolve(testManufacturer));

      expect(await carsController.getCarManufacturer(123)).toBe(
        testManufacturer,
      );
    });
  });
});