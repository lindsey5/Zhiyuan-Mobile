interface Product{
    id: number;
    product_name: string;
    description: string;
    thumbnail_public_id: string;
    thumbnail_url: string;
    category: string;
    variants: Variant[]
}

interface Variant {
    id: number;
    product_id: number;
    variant_name: string;
    stock: number;
    price: number;
    image_public_id: string;
    image_url: string;
    sku: string;
}

interface GetProductsResponse extends AxiosResponse {
    products: Product[];
    page: number;
    limit: number;
    totalPages: number;
}

interface GetProductResponse extends AxiosResponse {
    product: Product
}