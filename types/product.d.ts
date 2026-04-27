interface Product{
    _id: string;
    product_name: string;
    description: string;
    thumbnail_public_id: string;
    thumbnail_url: string;
    category: string;
    variants?: Variant[]
}

interface GetProductsResponse extends PaginationResponse {
    products: Product[];
}

interface GetProductResponse extends AxiosResponse {
    product: Product
}

interface MostSellingProduct {
    _id: string;
    totalSold: number;
    totalRevenue: number;
    variant: Variant;
}


interface GetMostSellingProductsResponse extends AxiosResponse{
    mostSellingProducts: MostSellingProduct[];
}