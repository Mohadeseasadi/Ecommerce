import { Body, Controller, Get, Post } from '@nestjs/common';
import { APiResponse } from 'src/utils/api-response';
import { BookmarkProductDTO } from '../dto/create-bookmark.dto';
import { BookmarksService } from '../services/bookmark.service';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarkService: BookmarksService) {}

  @Post()
  async create(@Body() createBookmarkDto: BookmarkProductDTO) {
    const result = await this.bookmarkService.create(createBookmarkDto);
    return new APiResponse(true, result.msg, result.bookmark);
  }

  @Get()
  async findAll() {}
}
