
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
export class CreateProductDto {
    @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  discountPrice?: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsNotEmpty()
  images: string; 
}
