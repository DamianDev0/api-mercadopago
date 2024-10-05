import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductCartDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsMongoId({ each: true })
    @IsOptional()
    products?: string[];
}
