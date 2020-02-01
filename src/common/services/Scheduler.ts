import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { OwnersService } from '../../modules/owners/owners.service';

@Injectable()
export class Scheduler {
  private EVERY_DAY_PATTERN = '0 0 * * *';

  constructor(private readonly ownerService: OwnersService) {
    new CronJob(
      this.EVERY_DAY_PATTERN,
      this.removeOutdatedOwners.bind(this),
    ).start();
  }

  async removeOutdatedOwners() {
    console.log('[Cron Job]: Removing outdated owners...');

    await this.ownerService.removeOutdated();

    console.log('[Cron Job]: Removing outdated owners - DONE');
  }
}