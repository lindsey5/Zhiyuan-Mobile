import ProductScreen from "@/components/Product/ProductScreen";
import GradientBackground from "@/components/ui/GradientBackgroud";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
          <GradientBackground colors={["#F4E1C6", "#fff"]}>
            <ProductScreen />
          </GradientBackground>
        </QueryClientProvider>
    )
}