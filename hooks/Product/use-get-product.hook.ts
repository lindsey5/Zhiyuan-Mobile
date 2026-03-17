import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getProduct(id : number) {
    return await apiAxios<GetProductResponse>(`/api/products/${id}`, {
        method: HttpMethod.GET,
    });
}

export const useGetProduct = (id : number) => {
    return useQuery<GetProductResponse, Error>({
        queryKey: ['product'],
        queryFn: async () => await getProduct(id)
    });
};