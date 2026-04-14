interface Variant {
    _id: string;
    product_id: string;
    variant_name: string;
    stock: number;
    price: number;
    image_public_id: string;
    image_url: string;
    sku: string;
    product: Product;
}

interface GetVariantResponse extends AxiosResponse{
    variant: Variant;
}