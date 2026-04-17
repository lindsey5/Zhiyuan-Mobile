
interface Address {
    street: string;
    barangay: string;
    city: string;
}

interface Order {
    _id: string;
    order_id: string;
    customer_name: string;
    status: "pending" | "processing" | "delivered" |"completed" | "cancelled" | "refunded";
    total_amount: number;
    delivery_type: "pickup" | "delivery";
    payment_method: "COD" | "GCash" | "Card" | "Paymaya";
    payment_status: "paid" | "unpaid";
    address?: Address;
    order_items: OrderItem[];
}

interface OrderItem {
    _id: string;
    order_id: string;
    variant_id: string;
    variant: Variant;
    product: Product;
    quantity: number;
    amount: number;
    price: number;
}

interface CreateOrderState {
    customer_name: string,
    delivery_type: string,
    address?: {
        street: string;
        city: string;
        region: string;
        barangay: string;
    },
}

interface CreateOrderState {
    customer_name: string,
    delivery_type: string,
    address?: {
        street: string;
        city: string;
        region: string;
        barangay: string;
    },
}

interface CreateOrderItemPayload {
    variant_id: string;
    amount: number;
    quantity: number;
    price: number;
}

interface CreateOrderPayload extends CreateOrderState {
    items: CreateOrderItemPayload[]
}

interface CreateOrderResponse extends AxiosResponse {
    order: Order;
}