import ProductScreen from "@/components/Product/ProductScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <View style={{ flex: 1}}>
              <ProductScreen />
            </View>
        </QueryClientProvider>
    )
}