import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    stock: number;

    @IsNotEmpty()
    @IsString()
    category: string;

}
