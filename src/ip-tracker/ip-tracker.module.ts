import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IpTracker } from './entities/ip_traacker.entity';
import { IpTrackerService } from './ip-tracker.service';

@Module({
  imports: [TypeOrmModule.forFeature([IpTracker])],
  providers: [IpTrackerService],
  exports: [IpTrackerService],
})
export class IpTrackerModule {}
