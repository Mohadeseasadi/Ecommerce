import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpTracker } from './entities/ip_traacker.entity';

@Injectable()
export class IpTrackerService {
  private readonly MAX_REQUESTS = 10;
  private readonly WINDOW_MINUTE = 1;
  private readonly BLOCK_MINUTE = 1;

  constructor(
    @InjectRepository(IpTracker)
    private readonly ipTrackerRepo: Repository<IpTracker>,
  ) {}

  async track(ip: any) {
    const nowTime = new Date();

    let record = await this.ipTrackerRepo.findOne({ where: { ip } });

    if (!record) {
      let newRecord = this.ipTrackerRepo.create({
        ip,
        request_count: 1,
        window_start: nowTime,
        is_blocked: false,
        block_until: null,
      });
      await this.ipTrackerRepo.save(newRecord);
      console.log(`${ip} first request`);
      return;
    }
  }
}
