import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getVariant(id : string) {
    return await apiAxios<GetVariantResponse>(`/api/variants/${id}`, {
        method: HttpMethod.GET,
    });
}

export const useGetVariant = (id : string) => {
    return useQuery<GetVariantResponse, Error>({
        queryKey: [`variant/${id}`],
        queryFn: () => getVariant(id),
        refetchOnWindowFocus: false,
    });
};