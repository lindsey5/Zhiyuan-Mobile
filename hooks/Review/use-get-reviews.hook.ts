import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

interface GetReviewsParams {
    page: number,
    limit: number,
    rating?: number,
}

async function getReviews(params: GetReviewsParams) {
    return await apiAxios<GetReviewsResponse>('/api/reviews', {
        method: HttpMethod.GET,
        params
    });
}

export const useGetReviews = (params: GetReviewsParams) => {
    return useQuery<GetReviewsResponse, Error>({
        queryKey: ['reviews', params],
        queryFn: () => getReviews(params),
        refetchOnWindowFocus: false,
    });
};