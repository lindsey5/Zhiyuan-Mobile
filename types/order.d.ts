
interface CreateOrderParams {
    customer_name: string,
    delivery_type: string,
    address?: {
        street: string;
        city: string;
        region: string;
        barangay: string;
    },
}