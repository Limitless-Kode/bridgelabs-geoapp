import { renderHook, act } from '@testing-library/react-hooks';
import useCountries from './useCountries';
import {gql} from "@apollo/client";

const query = gql`
                query GetCountries($searchParam: String!) {
                    countries(filter: {name: {regex: $searchParam}}) {
                        code
                        name
                        emoji
                        currency
                    }
                }
            `;
const countriesList = [
    [
        { name: 'USA', population: 331002651 },
        { name: 'Canada', population: 37742154 },
        { name: 'India', population: 1380004385 },
        { name: 'Ghana', population: 31072940 },
        { name: 'Nigeria', population: 206139589 },
        { name: 'Kenya', population: 53771296 },
        { name: 'South Africa', population: 59308690 },
        { name: 'Egypt', population: 102334404 },
        { name: 'Morocco', population: 36910560 },
        { name: 'Tanzania', population: 59734218 },
        { name: 'Ethiopia', population: 114963588 },
        { name: 'Cameroon', population: 26545864 },
        { name: 'Zimbabwe', population: 14862924 },
        { name: 'Senegal', population: 16743927 },
        { name: 'Rwanda', population: 12952209 },
        { name: 'Tunisia', population: 11818619 },
        { name: 'Mali', population: 20250833 },
        { name: 'Uganda', population: 45741000 },
        { name: 'Angola', population: 32866272 },
        { name: 'Mozambique', population: 31255435 },
        { name: 'Zambia', population: 18383955 },
        { name: 'Madagascar', population: 27691018 },
        { name: 'Ivory Coast', population: 26378274 },
        { name: 'Cameroon', population: 26545864 },
        { name: 'Botswana', population: 2351627 },
        { name: 'Namibia', population: 2540905 },
        { name: 'Mauritius', population: 1271768 },
        { name: 'Seychelles', population: 98347 },
        { name: 'Comoros', population: 869601 },
        { name: 'Lesotho', population: 2142249 },
        { name: 'Eswatini', population: 1160164 },
        { name: 'South Sudan', population: 11193725 },
        { name: 'Sudan', population: 43849260 },
        { name: 'Somalia', population: 15893222 },
        { name: 'Djibouti', population: 988000 },
        { name: 'Burundi', population: 11890784 }
    ]
];
const mocks = [
    {
        request: {
            query: query,
            variables: {
                searchParam: '',
            },
        },
        result: {
            data: {
                countries: countriesList[0],
            },
        },
    },
];


jest.mock('@/providers/graphql.provider', () => ({
    __esModule: true,
    default: {
        query: jest.fn((searchParam: any) =>{
            return Promise.resolve({ data: { countries: countriesList[0].filter((country: any) => country.name === searchParam.query.definitions[0].selectionSet.selections[0].arguments[0].value.fields[0].value.fields[0].value.value) } })
        }),
    }
}));

describe('useCountries', () => {
    it('should return an empty list when searchParam is empty', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useCountries());

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toStrictEqual([]);
        expect(result.current.error).toBe(null);
    });
    it('should return only countries that match the searchParam', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useCountries());

        await act(async () => {
            result.current.query("USA");
            await waitForNextUpdate();
        });

        console.log("result.current.data", result.current.data)
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(mocks[0].result.data.countries.filter((country: any) => country.name === "USA"));
        expect(result.current.error).toBe(null);
    });
});