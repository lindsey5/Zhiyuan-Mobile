interface Product{
    _id: string;
    product_name: string;
    description: string;
    thumbnail_public_id: string;
    thumbnail_url: string;
    category: string;
    variants: Variant[]
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