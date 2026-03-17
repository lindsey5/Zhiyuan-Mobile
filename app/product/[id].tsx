import ProductScreen from "@/components/Product/ProductScreen";
import GradientBackground from "@/components/ui/GradientBackgroud";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Page() {

    return (
          <GradientBackground>
            <ProductScreen />
          </GradientBackground>
    )
}