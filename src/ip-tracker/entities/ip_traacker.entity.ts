import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ip_tracker')
export class IpTracker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column({ type: 'timestamp' })
  window_start: Date;

  @Column()
  request_count: number;

  @Column({ type: 'boolean', default: false })
  is_blocked: boolean;

  @Column({ type: 'timestamp', nullable: true })
  block_until: Date | null;
}
