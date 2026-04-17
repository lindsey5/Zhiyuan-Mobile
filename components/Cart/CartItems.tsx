import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import SwipeableCartItem from "./CartItem";

export default function CartItems ({ cart } : { cart : CartItem[] }) {
    const font16 = useResponsiveFontSize(16);

    return (
        <>
        {cart.map(item => (
            <SwipeableCartItem 
                key={item.variant_id}
                item={item}
                font16={font16}
            />
        ))}
        </>
    )
}