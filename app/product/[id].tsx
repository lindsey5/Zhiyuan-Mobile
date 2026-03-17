import ProductScreen from "@/components/Product/ProductScreen";
import GradientBackground from "@/components/ui/GradientBackgroud";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Page() {
    const queryClient = new QueryClient();
    
    return (
        <QueryClientProvider client={queryClient}>
          <GradientBackground colors={["#F4E1C6", "#fff"]}>
            <ProductScreen />
          </GradientBackground>
        </QueryClientProvider>
    )
}