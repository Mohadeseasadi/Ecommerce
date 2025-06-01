import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { IsNull, Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    private readonly userService: UsersService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { userId, replyTo, ...data } = createTicketDto;

    const user = await this.userService.findOne(userId);

    const replyto = replyTo
      ? await this.ticketRepo.findOne({
          where: { id: replyTo },
          relations: ['replyto'],
        })
      : null;

    if (replyto?.replyto)
      throw new BadRequestException("You can't reply to a reply ticket");

    const ticket = this.ticketRepo.create({
      ...data,
      user,
      replyto: replyto as Ticket | undefined,
    });

    return await this.ticketRepo.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepo.find({
      where: { replyto: IsNull() },
      relations: ['replyto'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
