import useResponsiveFontSize from "@/hooks/useResponsiveFont";
import SwipeableCartItem from "./CartItem";

export default function CartItems ({ cart } : { cart : CartItem[] }) {
    const size = useResponsiveFontSize(80);
    const font20 = useResponsiveFontSize(20);
    const font24 = useResponsiveFontSize(24);

    return (
        <>
        {cart.map(item => (
            <SwipeableCartItem 
                key={item.id}
                item={item}
                font20={font20}
                font24={font24}
                size={size}
            />
        ))}
        </>
    )
}