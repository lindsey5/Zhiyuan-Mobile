import COLOR from "@/lib/contants/color";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Step = {
  label: string;
  icon: React.ReactNode;
};

type StepperProps = {
  steps: Step[];
  currentStep: number;
};

export default function Stepper({ steps, currentStep }: StepperProps) {

    return (
        <View style={styles.container}>
        {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber <= currentStep;

            return (
                <View key={index} style={[styles.stepWrapper, stepNumber !== steps.length && { flex: 1 }]}>
                    {/* Circle */}
                    <View
                        style={[styles.circle, isActive && styles.activeCircle]}
                    >
                        {step.icon}

                        <Text style={styles.label}>
                        {step.label}
                        </Text>
                    </View>
                    {/* Line (hide for last step) */}
                    {stepNumber !== steps.length && (
                        <View style={[styles.line, stepNumber < currentStep && styles.activeLine]} />
                    )}
                </View>
            );
        })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        width: "100%",
    },

    stepWrapper: { 
        flexDirection: 'row',
        alignItems: 'center' 
    },

    circle: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: '#bebebe'
    },

    activeCircle: {
        backgroundColor: COLOR.primary,
    },

    label: { 
        width: 100,
        textAlign: 'center',
        fontSize: 12,
        position: 'absolute', 
        left: '50%',
        transform: [{ translateX: '-50%' }],
        bottom: -20, 
        fontWeight: 'bold' 
    },

    line: {
        flex: 1,
        height: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#bebebe'
    },

    activeLine: {
        backgroundColor: COLOR.primary,
    },

});