import { useEffect, useState } from "react";
import { GetAddress } from "./address.type";

export default function useGetBarangays (cityCode : string) : GetAddress[] {
    const [barangays, setBarangays] = useState([]);
    
    useEffect(() => {
        if(!cityCode) return;

        const getCities = async () => {
            const response = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays`);
            const data = await response.json();
            setBarangays(data.sort((a : any, b : any) => a.name.localeCompare(b.name)));
        }

        getCities();
    }, [cityCode])

    return barangays
}