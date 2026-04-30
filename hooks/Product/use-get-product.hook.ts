import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getProduct(id : string) {
    return await apiAxios<GetProductResponse>(`/api/products/${id}`, {
        method: HttpMethod.GET,
    });
}

export const useGetProduct = (id : string) => {
    return useQuery<GetProductResponse, Error>({
        queryKey: ['product'],
        queryFn: () => getProduct(id),
        refetchOnWindowFocus: false,
    });
};