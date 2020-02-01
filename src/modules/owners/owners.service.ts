import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Owner } from './owner.entity';

@Injectable()
export class OwnersService {
  private readonly MONTH_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;
  private readonly OUTDATED_MONTHS = 18;

  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>,
  ) {}

  public async removeOutdated(): Promise<Owner[]> {
    const lastDate = new Date(Date.now() - this.MONTH_MILLISECONDS * this.OUTDATED_MONTHS);
    const outdatedOwners = await this.ownerRepo.find({
      purchaseDate: LessThan(lastDate),
    });
    return this.ownerRepo.remove(outdatedOwners);
  }
}
