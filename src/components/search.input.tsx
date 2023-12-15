import React from "react";
import {FiSearch} from "react-icons/fi";

type SearchInputProps = {
    onChange: (e: string) => void;
    onSearch: () => void;
    value?: string;
}
const SearchInput = ({onChange, onSearch, value}: SearchInputProps) => {
    return (
        <div className="flex items-center" id="search">
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="text"
                className="rounded-l-lg outline-none px-5 text-sm h-[60px] min-w-[280px] md:min-w-[450px]"
                placeholder="Search by country, states or continents"
            />
            <button onClick={onSearch} className="flex items-center justify-center bg-orange-600 border-none rounded-r-lg text-white text-2xl h-[60px] w-[60px]">
                <FiSearch />
            </button>
        </div>
    )
}

export default SearchInput;