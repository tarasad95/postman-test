import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ description: 'The name of the item', example: 'Widget' })
  name: string;

  @ApiProperty({ description: 'The description of the item', example: 'A useful widget for everyday tasks' })
  description: string;

  @ApiProperty({ description: 'The price of the item in dollars', example: 19.99 })
  price: number;

  @ApiProperty({ description: 'The quantity available in stock', example: 100 })
  quantity: number;
}
