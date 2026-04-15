import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import SwipeableCartItem from "./CartItem";

export default function CartItems ({ cart } : { cart : CartItem[] }) {
    const font20 = useResponsiveFontSize(20);
    const font16 = useResponsiveFontSize(16);

    return (
        <>
        {cart.map(item => (
            <SwipeableCartItem 
                key={item.variant_id}
                item={item}
                font20={font20}
                font16={font16}
            />
        ))}
        </>
    )
}