
interface Category {
    id: number;
    name: string;
    createdAt: Date;
}

interface GetCategoriesResponse {
    success: boolean;
    categories: Category[]
}