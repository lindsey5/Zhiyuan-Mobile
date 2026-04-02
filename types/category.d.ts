
interface Category {
    _id: string;
    name: string;
    createdAt: Date;
}

interface GetCategoriesResponse {
    success: boolean;
    categories: Category[]
}