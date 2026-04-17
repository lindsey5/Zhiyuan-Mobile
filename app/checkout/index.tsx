import Stepper from "@/components/Checkout/Stepper";
import GradientBackground from "@/components/ui/GradientBackground";
import { useState } from "react";
import { ClipboardList, User, CheckCircle2 } from "lucide-react-native";
import { StyleSheet } from "react-native";
import CustomizedText from "@/components/ui/Text";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary";
import { useSocket } from "@/hooks/useSocket";
import CheckoutInfo from "@/components/Checkout/CheckoutInfo";

const steps = [
    { label: "Summary", icon: <ClipboardList size={22} color="black" /> },
    { label: "Info", icon: <User size={22} color="black" /> },
    { label: "Confirmation", icon: <CheckCircle2 size={22} color="black" /> },
];

export default function Page () {
    const [currentStep, setCurrentStep] = useState(1);
    const [order, setOrder] = useState<CreateOrderParams>();
    useSocket({ namespace: '/orders' });

    const next = () => {
        setCurrentStep(prev => prev + 1);
    }

    const back = () => {
        setCurrentStep(prev => prev - 1);
    }

    const setDeliveryType = (value: string) => {
        setOrder(prev => ({ ...prev!, delivery_type: value, address: undefined }));
    }

    return (
        <GradientBackground style={styles.container}>
            <CustomizedText style={[ styles.title]}>Checkout</CustomizedText>
            <Stepper steps={steps} currentStep={currentStep}/>
            <CheckoutSummary 
                deliveryType={order?.delivery_type || ""}  
                next={next}
                setDeliveryType={setDeliveryType}
                currentStep={currentStep}
            />
            <CheckoutInfo 
                next={next}
                back={back}
                order={order}
                setOrder={setOrder}
                currentStep={currentStep}
            />
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    container: { 
        gap: 10, 
        paddingTop: 50, 
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    title: { 
        fontWeight: 'bold', 
        textAlign: 'center',
        fontSize: 30
    },
})