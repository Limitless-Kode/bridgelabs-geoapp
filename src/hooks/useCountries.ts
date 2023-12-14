import {gql} from '@apollo/client';
import graphQLProvider from "@/providers/graphql.provider";
import {useEffect, useState} from "react";
import {Country} from "@/types/country.types";


const useCountries = () => {
    const [searchParam, setSearchParam] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState<Array<Country>>([]);

    useEffect(()=> {
        if(!searchParam) {
            setLoading(false);
            return setData([]);
        }

        setLoading(true);
        graphQLProvider
            .query({
                query: gql`
                query {
                    countries(filter: {name: {regex: "${searchParam}"}}) {
                        code
                        name
                        emoji
                        currency
                    }
                }
            `,
            })
            .then((result) => {
                setData(result.data.countries);

            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    },[searchParam]);

    const query = (searchParam: string) => setSearchParam(searchParam);

    return { loading, error, data, query };
}

export default useCountries;