import { Address } from 'src/address/entities/address.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserRoleEnum from '../enums/user.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: false })
  display_name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.User })
  role: UserRoleEnum;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
