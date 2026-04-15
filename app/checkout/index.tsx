import Stepper from "@/components/Checkout/Stepper";
import GradientBackground from "@/components/ui/GradientBackgroud";
import { useState } from "react";
import { ClipboardList, User, CheckCircle2 } from "lucide-react-native";
import { StyleSheet } from "react-native";
import CustomizedText from "@/components/ui/Text";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary";

const steps = [
    { label: "Summary", icon: <ClipboardList size={22} color="black" /> },
    { label: "Info", icon: <User size={22} color="black" /> },
    { label: "Confirmation", icon: <CheckCircle2 size={22} color="black" /> },
];

export default function Page () {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <GradientBackground style={{ gap: 10, paddingBottom: 20, paddingTop: 50 }}>
            <CustomizedText style={[ styles.title]}>Checkout</CustomizedText>
            <Stepper steps={steps} currentStep={currentStep}/>
            {currentStep === 1 && <CheckoutSummary />}
        </GradientBackground>
    )
}

const styles = StyleSheet.create({
    title: { 
        fontWeight: 'bold', 
        textAlign: 'center',
    },
})