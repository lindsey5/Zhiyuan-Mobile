import { useQuery } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';

async function getProducts(
    page: number = 1,
    limit: number = 10,
    sortBy: string,
    order: 'ASC' | 'DESC',
    categories: string[],
    search?: string,
    minPrice?: number,
    maxPrice?: number
) {
    const selectedCategories = categories.join(',');
    return await apiAxios<GetProductsResponse>('/api/products', {
        method: HttpMethod.GET,
        params: { 
            page, 
            limit, 
            search, 
            categories: selectedCategories, 
            sortBy, 
            order, 
            minPrice, 
            maxPrice
        },
    });
}

export const useGetProducts = (
    page: number = 1,
    limit: number = 10,
    sort: {
        sortBy: string,
        order: 'ASC' | 'DESC' 
    },
    filter: {
        categories: string[]
        minPrice?: number
        maxPrice?: number
    },
    search?: string,
) => {
    return useQuery<GetProductsResponse, Error>({
        queryKey: ['products', page, limit, sort.sortBy, sort.order, search, filter.categories, filter.maxPrice, filter.minPrice],
        queryFn: () => getProducts(
            page, 
            limit, 
            sort.sortBy, 
            sort.order,
            filter.categories, 
            search,  
            filter.minPrice,
            filter.maxPrice
        ),
        refetchOnWindowFocus: false,
    });
};