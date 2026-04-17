import Button from "../ui/Button";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import InputField from "../ui/InputField";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import useGetRegions from "@/hooks/Address/use-get-regions.hook";
import Dropdown from "../ui/Dropdown";
import useGetCities from "@/hooks/Address/use-get-cities.hook";
import useGetBarangays from "@/hooks/Address/use-get-barangays";
import COLOR from "@/lib/contants/color";

interface CheckoutInfoProps {
    next: () => void;
    back: () => void;
    order: CreateOrderParams | undefined;
    setOrder: Dispatch<SetStateAction<CreateOrderParams | undefined>>
    currentStep: number;
}

export default function CheckoutInfo({ next, back, order, setOrder, currentStep } : CheckoutInfoProps) {
    const regions = useGetRegions();
    const [selectedRegion, setSelectedRegion] = useState("");

    const cities = useGetCities(selectedRegion);
    const [selectedCity, setSelectedCity] = useState("");

    const barangays = useGetBarangays(selectedCity);

    const setRegion = useCallback((value : string) => {
        const region = regions.find((region : any) => region.code === value)?.name || "";
        setOrder(prev => ({ ...prev!, address: ({ ...prev?.address!, region })}))
        setSelectedRegion(value);
    }, [regions])

    const setCity = useCallback((value : string) => {
        const city = cities.find((city : any) => city.code === value)?.name || "";
        setOrder(prev => ({ ...prev!, address: ({ ...prev?.address!, city })}))
        setSelectedCity(value)
    }, [cities])

    const setBarangay = useCallback((value : string) => {
        setOrder(prev => ({ ...prev!, address: ({ ...prev?.address!, barangay: value })}))
    }, [cities])

    
    const disabled = useMemo(() => {
        return !order?.address?.street || !order.address.barangay || !order.address.city || !order.address.region || !order.customer_name
    }, [order])

    useEffect(() => {
        if(!order?.address) {
            setSelectedRegion("");
            setSelectedCity("");
        }
    }, [order])

    if(currentStep !== 2) return null

    return (
        <>
        <ScrollView style={styles.container} contentContainerStyle={{ gap: 20 }}>
            <Text style={styles.sectionLabel}>Customer Information</Text>
            <InputField 
                label="Name"
                placeholder="Enter your name"
                value={order?.customer_name}
                onChangeText={(value) => setOrder(prev => ({...prev!, customer_name: value }))}
            />
            {order?.delivery_type === 'delivery' && (
                <>
                <Text style={styles.sectionLabel}>Delivery Address</Text>
                <InputField 
                    label="Delivery Address" 
                    placeholder="e.g. Blk 5 Lot 12, Rizal St." 
                    value={order?.address?.street}
                    onChangeText={(value) => setOrder(prev => ({...prev!, address: ({ ...prev?.address!, street: value }) }))}
                />
                <Dropdown 
                    options={regions.map((region : any) => ({
                        label: region.name,
                        value: region.code
                    }))}
                    label="Region"
                    onSelect={setRegion}
                    value={selectedRegion}
                    placeholder="Select Region"
                />
                <Dropdown 
                    options={cities.map((city : any) => ({
                        label: city.name,
                        value: city.code
                    }))}
                    label="City / Municipality"
                    onSelect={setCity}
                    value={selectedCity}
                    placeholder="Select City / Municipality"
                    disabled={!selectedRegion || !cities.length}
                />
                <Dropdown 
                    options={barangays.map((city : any) => ({
                        label: city.name,
                        value: city.name
                    }))}
                    label="Barangay"
                    value={order?.address?.barangay || ""}
                    onSelect={setBarangay}
                    placeholder="Select Barangay"
                    disabled={!selectedCity || !barangays.length}
                />
                </>
            )}
        </ScrollView>  
        <View style={styles.buttonContainer}>
            <Button
                style={[styles.backButton, styles.button]}
                onPress={back}
            >
                <Text style={styles.buttonText}>Back</Text>
            </Button>

            <Button style={[styles.button, disabled && { opacity: 0.4 }]} onPress={next} disabled={disabled}>
                <Text style={styles.buttonText}>Next</Text>
            </Button>
        </View>      
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },

    sectionLabel: {
        fontWeight: "600",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        color: COLOR.muted,
        marginBottom: 2,
    },

    buttonContainer: {
        width: "100%",
        gap: 10,
        flexDirection: 'row',
        paddingBottom: 20,
    },

    button: {
        flex: 1,
    },

    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
    },

    backButton: {
        backgroundColor: "#e0e0e0",
        borderWidth: 1,
        borderColor: "#bdbdbd",
    },
});