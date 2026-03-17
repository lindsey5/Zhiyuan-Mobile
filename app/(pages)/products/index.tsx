import ProductsScreen from "@/components/Products/ProductsScreen";
import GradientBackground from "@/components/ui/GradientBackgroud";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <GradientBackground>
                <ProductsScreen />
            </GradientBackground>
        </QueryClientProvider>
    )
}