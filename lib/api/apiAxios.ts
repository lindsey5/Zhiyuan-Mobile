import { HttpMethod } from '../data/httpMethod';
import axiosClient from './axiosClient';

interface ApiOptions {
    method?: HttpMethod;
    data?: any;
    params?: Record<string, any>; 
}

export async function apiAxios<T>(
    endpoint: string,
    options?: ApiOptions
): Promise<T> {
    const { method = HttpMethod.GET, data, params } = options || {};

    const res = await axiosClient.request<T>({
        url: endpoint,
        method,
        data,
        params, 
    });

    return res.data;
}