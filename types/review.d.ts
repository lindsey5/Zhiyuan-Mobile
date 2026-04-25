
interface Review {
    _id: string;
    name: string;
    rating: number;
    review: string;
    createdAt: string;
}

interface CreateReviewPayload {
    name: string;
    rating: number;
    review: string;
}

interface CreateReviewResponse extends AxiosResponse {
    review: Review;
}