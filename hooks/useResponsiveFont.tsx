import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function responsiveFontSize(size: number) {
    const screen = useBreakpoint();
    switch (screen) {
        case 'xs':
        return size * 0.8;
        case 'sm':
        return size * 0.9;
        case 'md':
        return size;
        case 'lg':
        return size * 1.5;
        default:
        return size;
    }
}