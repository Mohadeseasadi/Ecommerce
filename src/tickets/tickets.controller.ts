import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { APiResponse } from 'src/utils/api-response';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    const newTicket = await this.ticketsService.create(createTicketDto);

    return new APiResponse(true, 'Ticket created successfully!', newTicket);
  }

  @Get()
  async findAll() {
    const tickets = await this.ticketsService.findAll();
    return new APiResponse(true, 'Tickets fetched successfully!', tickets);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ticket = await this.ticketsService.findOne(+id);

    return new APiResponse(true, 'Ticket fetched successfully!', ticket);
  }
}
