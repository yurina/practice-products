import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Length, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Laptop',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the product',
    example: 'A high-performance laptop',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 1299.99,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;
}
