import {Timezone} from "countries-and-timezones";

export type CountryDetails = {
    href:         string;
    name:         Name;
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc:         string;
    fifa:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    currencies:   Currency[];
    idd:          Idd;
    capital:      Capital[];
    altSpellings: string[];
    region:       string;
    subregion:    string;
    continents:   string[];
    languages:    Language[];
    latLng:       LatLng;
    landlocked:   string;
    borders:      string[];
    area:         number;
    flag:         string;
    flags:        Flags;
    demonyms:     Demonym[];
    coatOfArms:   CoatOfArms;
    population:   number;
    maps:         Maps;
    gini:         Gini;
    car:          Car;
    timezones:    string[];
    startOfWeek:  string;
    postalCode:   Gini;
    gdp:          Gdp;
    groups:       string[];
}

export type Capital = {
    name:   string;
    latLng: LatLng;
}

export type LatLng = {
    lat: number;
    lng: number;
}

export type Car = {
    signs: string[];
    side:  string;
}

export type CoatOfArms = {
    png: string;
    svg: string;
}

export type Currency = {
    name:      string;
    alphaCode: string;
    symbol:    string;
}

export type Demonym = {
    langCode: string;
    f:        string;
    m:        string;
}

export type Flags = {
    png: string;
    svg: string;
    alt: string;
}

export type Gdp = {
    currency: string;
    value:    number;
    year:     number;
}

export type Gini = {
}

export type Idd = {
    root:     string;
    suffixes: string[];
}

export type Language = {
    code: string;
    name: string;
}

export type Maps = {
    googleMaps:     string;
    openStreetMaps: string;
}

export type Name = {
    common:       string;
    official:     string;
    nativeName:   NativeName[];
    translations: NativeName[];
}

export type NativeName = {
    lang:     string;
    official: string;
    common:   string;
}

export type Country = {
    code: Timezone;
    name: string;
    emoji: string;
    currency: string;
}