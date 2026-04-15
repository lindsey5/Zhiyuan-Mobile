import { useEffect, useState } from "react";
import { GetAddress } from "./address.type";

function normalizeCityName(name: string): string {
    // Check if it starts with "City of "
    if (name.startsWith("City of ")) {
        // Remove "City of " and add " City" at the end
        const city = name.replace("City of ", "");
        return `${city} City`;
    }
    // Otherwise, return as-is
    return name;
}

export default function useGetCities (regionCode : string) : GetAddress[] {
    const [cities, setCities] = useState([]);
    
    useEffect(() => {
        if(!regionCode) return;

        const getCities = async () => {
            const response = await fetch(`https://psgc.gitlab.io/api/regions/${regionCode}/cities-municipalities`);
            const data = await response.json();
            setCities(data
                .map((city : any) => ({ ...city, name: normalizeCityName(city.name)}))
                .sort((a : any, b : any) => a.name.localeCompare(b.name))
            );
        }

        getCities();
    }, [regionCode])

    return cities
}