export declare class Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    sku?: string;
    isActive: boolean;
    images?: string[];
    mainImage?: string;
    categoryId?: number;
    createdAt: Date;
    updatedAt: Date;
}
