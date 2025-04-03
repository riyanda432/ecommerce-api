export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    stock: number;
    sku?: string;
    isActive?: boolean;
    images?: string[];
    mainImage?: string;
    categoryId?: number;
}
