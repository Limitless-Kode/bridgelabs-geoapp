import Image from "next/image";
import {getCurrentTimeInTimezone} from "@/helpers/time";
import * as ct from "countries-and-timezones";
import {format_currency, format_number} from "@/helpers/formatters";
import {CountryDetails} from "@/types/country.types";
import {MouseEventHandler} from "react";

type CountryDetailsSheetProps = {
    country: CountryDetails;
    expand: boolean;
    toggle: MouseEventHandler<HTMLDivElement>;
}
const CountryDetailsSheet = ({country, expand, toggle}: CountryDetailsSheetProps) => {
    return (
        <div
            id="country-details-sheet"
            className={`transition-all fixed ${expand ? "bottom-0" : "bottom-[calc(-50vh+75px)]"} right-5 min-w-[400px] rounded-t-xl overflow-clip max-h-[50vh]`}
        >
            <div role="button" onClick={toggle} className="p-5 bg-orange-600">
                <div
                    className={`transition-colors flex items-center gap-2 px-3 rounded-full cursor-pointer min-w-[150px] text-white font-bold`}>
                    <div
                        className="flex items-center justify-center text-xl h-[35px] w-[35px] rounded-full bg-white">{country.flag}</div>
                    <div className="flex flex-col gap-0">
                        <h1>{country.name.common}</h1>
                        <p className="text-xs font-normal">{country.continents[0]}</p>
                    </div>
                </div>
            </div>
            <div className="py-5 [&>*:nth-child(even)]:bg-orange-600/10 [&>*]:py-3">
                <div className="flex items-center justify-between px-5">
                    <h1 className="">Coat Of Arms</h1>
                    <Image src={country.coatOfArms.svg} alt={""} width={30} height={30}/>
                </div>
                <div className="flex items-center justify-between px-5">
                    <h1 className="">Time</h1>
                    <h1 className="">{getCurrentTimeInTimezone(ct.getTimezonesForCountry(country.cca2)?.[0].name)}</h1>
                </div>
                <div className="flex items-center justify-between px-5">
                    <h1 className="">Population</h1>
                    <h1 className="">{format_number(country.population)}</h1>
                </div>
                <div className="flex items-center justify-between px-5">
                    <h1 className="">Capital</h1>
                    <h1 className="">{country.capital[0]}</h1>
                </div>
                <div className="flex items-center justify-between px-5">
                    <h1 className="">Currency</h1>
                    <h1 className="">{country.currencies[Object.keys(country.currencies)[0] as string].name}</h1>
                </div>

                <div className="flex items-center justify-between px-5">
                    <h1 className="">Phone Code</h1>
                    <h1 className="">{country.idd.root}{country.idd.suffixes[0]}</h1>
                </div>

                <div className="flex items-center justify-between px-5">
                    <h1 className="">Longitude</h1>
                    <h1 className="">{country.latlng[1]}</h1>
                </div>
                <div className="flex items-center justify-between px-5">
                    <h1 className="">Latitude</h1>
                    <h1 className="">{country.latlng[0]}</h1>
                </div>
            </div>
        </div>
    );
}


export default CountryDetailsSheet;