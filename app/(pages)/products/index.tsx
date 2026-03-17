import ProductsScreen from "@/components/Products/ProductsScreen";
import GradientBackground from "@/components/ui/GradientBackgroud";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Page() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <GradientBackground>
                <ProductsScreen />
            </GradientBackground>
        </QueryClientProvider>
    )
}