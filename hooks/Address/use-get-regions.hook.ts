import { useEffect, useState } from "react";
import { GetAddress } from "./address.type";

export default function useGetRegions () : GetAddress[] {
    const [regions, setRegions] = useState([]);
    
    useEffect(() => {
        const getRegions = async () => {
            const response = await fetch('https://psgc.gitlab.io/api/regions');
            const data = await response.json();
            setRegions(data.sort((a : any, b : any) => a.name.localeCompare(b.name)));
        }

        getRegions();
    }, [])

    return regions
}