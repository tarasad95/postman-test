import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiPropertyOptional({ description: 'The name of the item', example: 'Widget' })
  name?: string;

  @ApiPropertyOptional({ description: 'The description of the item', example: 'A useful widget for everyday tasks' })
  description?: string;

  @ApiPropertyOptional({ description: 'The price of the item in dollars', example: 19.99 })
  price?: number;

  @ApiPropertyOptional({ description: 'The quantity available in stock', example: 100 })
  quantity?: number;
}
