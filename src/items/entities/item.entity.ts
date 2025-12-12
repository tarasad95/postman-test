import { ApiProperty } from '@nestjs/swagger';

export class Item {
  @ApiProperty({ description: 'Unique identifier', example: 1 })
  id: number;

  @ApiProperty({ description: 'Name of the item', example: 'Widget' })
  name: string;

  @ApiProperty({ description: 'Description of the item', example: 'A useful widget' })
  description: string;

  @ApiProperty({ description: 'Price in dollars', example: 19.99 })
  price: number;

  @ApiProperty({ description: 'Quantity in stock', example: 100 })
  quantity: number;

  @ApiProperty({ description: 'Creation timestamp', example: '2025-01-01T00:00:00.000Z' })
  createdAt: Date;
}
