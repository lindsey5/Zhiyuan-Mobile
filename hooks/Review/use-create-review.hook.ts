import { useMutation } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';
import Toast from "react-native-toast-message";

async function createReview(data : CreateReviewPayload) {
    return await apiAxios<CreateReviewResponse>('/api/reviews', {
        method: HttpMethod.POST,
        data
    });
}

export const useCreateReview = () => {

    return useMutation({
        mutationFn: ({ data }: { data: CreateReviewPayload }) => createReview(data),

        onError: (error) => {
            let message = error.message || "Something went wrong.";

            Toast.show({
                type: "error",
                text1: "Failed",
                text2: message,
            });
        },
        onSuccess: (data) => Toast.show({ type: 'success', text1: 'Success', text2: data.message }),

    });
};