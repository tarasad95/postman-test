import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { ApiKeyGuard } from '../auth/api-key.guard';

@ApiTags('Items')
@ApiSecurity('api-key')
@UseGuards(ApiKeyGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all items', description: 'Retrieve a list of all items' })
  @ApiResponse({ status: 200, description: 'List of items returned successfully', type: [Item] })
  findAll() {
    return this.itemsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search items', description: 'Search items by query string' })
  @ApiQuery({ name: 'q', required: false, description: 'Search query string' })
  @ApiResponse({ status: 200, description: 'Search results returned successfully', type: [Item] })
  search(@Query('q') query: string) {
    return this.itemsService.search(query || '');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID', description: 'Retrieve a single item by its ID' })
  @ApiParam({ name: 'id', description: 'Item ID', type: Number })
  @ApiResponse({ status: 200, description: 'Item found and returned successfully', type: Item })
  @ApiResponse({ status: 404, description: 'Item not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create item', description: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully', type: Item })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update item', description: 'Update an existing item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID', type: Number })
  @ApiResponse({ status: 200, description: 'Item updated successfully', type: Item })
  @ApiResponse({ status: 404, description: 'Item not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item', description: 'Delete an item by ID' })
  @ApiParam({ name: 'id', description: 'Item ID', type: Number })
  @ApiResponse({ status: 200, description: 'Item deleted successfully', type: Item })
  @ApiResponse({ status: 404, description: 'Item not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(id);
  }
}
