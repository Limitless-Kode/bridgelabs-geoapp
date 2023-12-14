"use client"
import {useEffect, useState} from "react";
import SearchInput from "@/components/search.input";
import useCountries from "@/hooks/useCountries";
import {Shimmer} from "react-shimmer";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import * as ct from "countries-and-timezones";
import {getCurrentTimeInTimezone} from "@/helpers/time";
import useCountry from "@/hooks/useCountry";
import {Country} from "@/types/country.types";
import Image from "next/image";
import {format_currency, format_number} from "@/helpers/formatters";


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

            <div className="w-[80vw]">
                <ComposableMap>
                    <Geographies geography="/features.json">
                        {({ geographies }) =>
                            geographies.map((geo: any) => (
                                <Geography
                                    className="cursor-pointer"
                                    onClick={() => onMapSelect(geo.properties.name)}
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#F2F2F2"
                                    stroke="#CCC"
                                    style={{
                                        default: {
                                            fill: selectedCountry?.name === geo.properties.name ? "#EA580D" : "#F2F2F2",
                                            outline: 'none'
                                        },
                                        hover: {
                                            fill: "#EA580D",
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#C530CC",
                                            outline: "none",
                                        },
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ComposableMap>
            </div>
        </div>


        {
            selectedCountry && country && (
                <div className={`transition-all fixed ${openCountryDetails ? "bottom-0" : "bottom-[calc(-50vh+75px)]"}  right-5 min-w-[400px] rounded-t-xl overflow-clip max-h-[50vh]`}>
                    <div role="button" onClick={()=> setOpenCountryDetails(!openCountryDetails)} className="p-5 bg-orange-600">
                        <div
                            className={`transition-colors flex items-center gap-2 px-3 rounded-full cursor-pointer min-w-[150px] text-white font-bold`}>
                            <div className="flex items-center justify-center text-xl h-[35px] w-[35px] rounded-full bg-white">{selectedCountry?.emoji}</div>
                            <h1>{selectedCountry?.name}</h1>
                        </div>
                    </div>
                    <div className="py-5 [&>*:nth-child(even)]:bg-orange-600/10 [&>*]:py-3">
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">Coat Of Arms</h1>
                            <Image src={country.coatOfArms.svg} alt={""} width={30} height={30}/>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">Time</h1>
                            <h1 className="">{getCurrentTimeInTimezone(ct.getTimezonesForCountry(selectedCountry.code as any)[0].name)}</h1>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">Population</h1>
                            <h1 className="">{format_number(country.population)}</h1>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">Capital</h1>
                            <h1 className="">{country.capital[0].name}</h1>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">Currency</h1>
                            <h1 className="">{country.currencies[0].name}</h1>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">GDP</h1>
                            <h1 className="">{format_currency(country.gdp.value, country.gdp.currency)}</h1>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">Phone Code</h1>
                            <h1 className="">{country.idd.root}{country.idd.suffixes[0]}</h1>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">Latitude</h1>
                            <h1 className="">{country.latLng.lat}</h1>
                        </div>
                        <div className="flex items-center justify-between px-5">
                            <h1 className="">Longitude</h1>
                            <h1 className="">{country.latLng.lng}</h1>
                        </div>
                    </div>
                </div>
            )
        }
    </main>
  )
}
