import { useWindowDimensions } from 'react-native';

export function useBreakpoint() {
    const { width } = useWindowDimensions();

    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'xs';
}