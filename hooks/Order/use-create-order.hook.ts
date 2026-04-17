import { useMutation } from '@tanstack/react-query';
import { apiAxios } from '@/lib/api/apiAxios';
import { HttpMethod } from '@/lib/data/httpMethod';
import Toast from "react-native-toast-message";
import { useCartStore } from '@/lib/store/cartStore';

async function createOrder(data : CreateOrderPayload) {
    return await apiAxios<CreateOrderResponse>('/api/orders', {
        method: HttpMethod.POST,
        data
    });
}
export const useCreateOrder = () => {
    const { clearCart } = useCartStore();

    return useMutation({
        mutationFn: ({ data }: { data: CreateOrderPayload }) => createOrder(data),

        onError: (error) => {
            let message = error.message || "Something went wrong.";

            Toast.show({
                type: "error",
                text1: "Order Failed",
                text2: message,
            });
        },
        onSuccess: () => clearCart(),

    });
};