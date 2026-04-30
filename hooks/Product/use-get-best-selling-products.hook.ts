import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getBestSellingProducts() {
    return await apiAxios<GetBestSellingProductsResponse>('/api/products/best-selling', {
        method: HttpMethod.GET,
    });
}

export const useGetMostSellingProducts = () => {
    return useQuery<GetBestSellingProductsResponse, Error>({
        queryKey: ['products/best-selling'],
        queryFn: () => getBestSellingProducts(),
        refetchOnWindowFocus: false,
    });
};