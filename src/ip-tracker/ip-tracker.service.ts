import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IpTracker } from './entities/ip_traacker.entity';

@Injectable()
export class IpTrackerService {
  private readonly MAX_REQUESTS = 3;
  private readonly WINDOW_MINUTES = 1;
  private readonly BLOCK_MINUTES = 1;
  private readonly TEHRAN_OFFSET_MS = 3.5 * 60 * 60 * 1000;

  constructor(
    @InjectRepository(IpTracker)
    private readonly ipTrackerRepo: Repository<IpTracker>,
  ) {}

  private getTehranNow(): Date {
    return new Date(Date.now() + this.TEHRAN_OFFSET_MS);
  }

  private throwBlocked(blockUntil: Date) {
    throw new HttpException(
      {
        statusCode: 429,
        error: 'Too Many Requests',
        message: `You are blocked until ${blockUntil.toLocaleString('fa-IR')}`,
      },
      429,
    );
  }

  async track(ip: string): Promise<void> {
    const now = this.getTehranNow();

    let record = await this.ipTrackerRepo.findOne({ where: { ip } });

    if (!record) {
      record = this.ipTrackerRepo.create({
        ip,
        request_count: 1,
        window_start: now,
        is_blocked: false,
        block_until: null,
      });
      await this.ipTrackerRepo.save(record);

      return;
    }

    if (record.is_blocked && record.block_until && record.block_until > now) {
      this.throwBlocked(record.block_until);
    }

    const windowEnd = new Date(
      record.window_start.getTime() + this.WINDOW_MINUTES * 60 * 1000,
    );

    if (now > windowEnd) {
      record.request_count = 1;
      record.window_start = now;
      record.is_blocked = false;
      record.block_until = null;
    } else {
      if (record.request_count >= this.MAX_REQUESTS) {
        record.is_blocked = true;
        record.block_until = new Date(
          now.getTime() + this.BLOCK_MINUTES * 60 * 1000,
        );
        await this.ipTrackerRepo.save(record);
        this.throwBlocked(record.block_until);
      } else {
        record.request_count += 1;
      }
    }
    await this.ipTrackerRepo.save(record);
  }
}
