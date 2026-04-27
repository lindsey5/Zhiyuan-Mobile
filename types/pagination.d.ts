
interface PaginationResponse extends AxiosResponse {
    page: number;
    limit: number;
    totalPages: number;
}