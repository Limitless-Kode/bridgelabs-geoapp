import {useEffect, useState} from "react";
import axios from "axios";
import {CountryDetails} from "@/types/country.types";


const useCountry = (country?: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState<CountryDetails|null>(null);

    useEffect(() => {
        console.log("ENV", process.env.RAPID_API_KEY);
        if (!country) {
            setLoading(false);
            return setData(null);
        }
        setLoading(true);
        const getCountryDetails = async () => {
            const options = {
                method: 'GET',
                url: `https://geography4.p.rapidapi.com/apis/geography/v1/country/name/${country}`,
                params: {
                    exactMatch: 'true',
                    limit: '2',
                    sortOrder: 'asc',
                    sortBy: 'name'
                },
                headers: {
                    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                    'X-RapidAPI-Host': 'geography4.p.rapidapi.com'
                }
            };
            try {
                const response = await axios.request(options);
                setData(response.data[0]);
            } catch (error: any) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

       if(country)  getCountryDetails();
    }, [country]);

    return { loading, error, data };
}

export default useCountry;