import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getProducts(
    page: number = 1,
    limit: number = 10,
    search?: string,
    category?: string,
) {
    return await apiAxios<GetProductsResponse>('/api/products', {
        method: HttpMethod.GET,
        params: { page, limit, search, category },
    });
}

export const useGetProducts = (
    page: number = 1,
    limit: number = 10,
    search?: string,
    category?: string
) => {
    return useQuery<GetProductsResponse, Error>({
        queryKey: ['products', page, limit, search, category],
        queryFn: async () => await getProducts(page, limit, search, category)
    });
};