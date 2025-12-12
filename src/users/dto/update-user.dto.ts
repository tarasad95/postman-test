import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'The name of the user', example: 'John Doe' })
  name?: string;

  @ApiPropertyOptional({ description: 'The email address of the user', example: 'john.doe@example.com' })
  email?: string;
}
