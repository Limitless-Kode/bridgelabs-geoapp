"use client"
import {useEffect, useState} from "react";
import SearchInput from "@/components/search.input";
import useCountries from "@/hooks/useCountries";
import {Shimmer} from "react-shimmer";
import useCountry from "@/hooks/useCountry";
import {Country} from "@/types/country.types";
import InteractiveMap from "@/components/interactiveMap";
import CountryDetailsSheet from "@/components/country.details.sheet";


export default function Home() {
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<Country|null>(null);
    const {data, loading, query} = useCountries();
    const {data: country} = useCountry(selectedCountry?.name);
    const [openCountryDetails, setOpenCountryDetails] = useState(false);

    const onMapSelect = (name: string) => {
        setSearch(name);
        setOpenCountryDetails(true);
        const country = data?.find((country) => country.name === name);

        if(!country) {
            query(name);
        }
    }

    useEffect(() => {
        const country = data?.find((country) => country.name === search);
        if(country) {
            setSelectedCountry(country);
        }
    },[data, search]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-blue-100 via-transparent to-transparent">
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-8">Bridge Labs Geo App</h1>

            <SearchInput
                value={search}
                onChange={setSearch}
                onSearch={() => {
                    setSelectedCountry(null);
                    query(search);
                }}
            />
            <div className="flex items-center justify-center flex-wrap gap-3 max-w-[600px] my-8">

                {
                    loading && Array.from({length: 3}).map((_, index) => {
                        return (
                            <div key={index}
                                 className="flex items-center gap-2 rounded-full cursor-pointer min-w-[150px] overflow-clip">
                                <Shimmer width={150} height={40}/>
                            </div>
                        )
                    })
                }

                {
                    !loading && data?.map((country, index) => {
                        return (
                            <div
                                key={index}
                                role="button"
                                onClick={()=> {
                                    setSelectedCountry(country);
                                    setOpenCountryDetails(true);
                                }}
                                className={`transition-colors flex items-center gap-2 p-2 px-3 rounded-full cursor-pointer min-w-[150px] ${country.code === selectedCountry?.code ? "bg-orange-600 text-white":"bg-orange-100"}`}>
                                <div className="flex items-center justify-center text-xl h-[35px] w-[35px] rounded-full bg-white">{country.emoji}</div>
                                <h1>{country.name}</h1>
                            </div>
                        )
                    })
                }
            </div>

            <InteractiveMap  onMapSelect={onMapSelect} selectedCountry={selectedCountry}/>
        </div>


        {
            selectedCountry && country && (
                <CountryDetailsSheet
                    country={country}
                    expand={openCountryDetails}
                    toggle={() => setOpenCountryDetails(!openCountryDetails)}
                />
            )
        }
    </main>
  )
}
