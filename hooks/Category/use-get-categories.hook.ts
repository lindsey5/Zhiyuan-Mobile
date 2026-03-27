import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getCategories() {
    return await apiAxios<GetCategoriesResponse>('/api/categories', {
        method: HttpMethod.GET,
    });
}

export const useGetCategories = () => {
    return useQuery<GetCategoriesResponse, Error>({
        queryKey: ['product'],
        queryFn: getCategories
    });
};