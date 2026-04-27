import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getMostSellingProducts() {
    return await apiAxios<GetMostSellingProductsResponse>('/api/products/most-selling', {
        method: HttpMethod.GET,
    });
}

export const useGetMostSellingProducts = () => {
    return useQuery<GetMostSellingProductsResponse, Error>({
        queryKey: ['products/most-selling'],
        queryFn: () => getMostSellingProducts()
    });
};