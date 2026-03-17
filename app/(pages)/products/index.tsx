import ProductsScreen from "@/components/Products/ProductsScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <ProductsScreen />
        </QueryClientProvider>
    )
}