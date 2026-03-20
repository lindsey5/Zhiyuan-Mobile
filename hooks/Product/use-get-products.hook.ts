import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getProducts(
    page: number = 1,
    limit: number = 10,
    sortBy: string,
    order: 'ASC' | 'DESC',
    search?: string,
    categories?: string[],
) {
    return await apiAxios<GetProductsResponse>('/api/products', {
        method: HttpMethod.GET,
        params: { page, limit, search, categories, sortBy, order },
    });
}

export const useGetProducts = (
    page: number = 1,
    limit: number = 10,
    sort: {
        sortBy: string,
        order: 'ASC' | 'DESC' 
    },
    search?: string,
    categories?: string[],
) => {
    return useQuery<GetProductsResponse, Error>({
        queryKey: ['products', page, limit, sort.sortBy, sort.order, search, categories],
        queryFn: async () => await getProducts(page, limit, sort.sortBy, sort.order, search, categories)
    });
};