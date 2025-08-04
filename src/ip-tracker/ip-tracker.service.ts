import { Injectable } from '@nestjs/common';

@Injectable()
export class IpTrackerService {
  async test(ip: any) {
    console.log(`${ip} connect to ip tracker service ...`);
  }
}
