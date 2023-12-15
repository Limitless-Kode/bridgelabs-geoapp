import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useCountry from "./useCountry";

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useCountry', () => {
    it('should fetch country details successfully', async () => {
        const countryDetails = {
            name: 'USA',
            population: 331002651,
            // add other properties as needed
        };

        mockedAxios.request.mockResolvedValueOnce({ data: [countryDetails] });

        const { result, waitForNextUpdate } = renderHook(() => useCountry('USA'));

        await waitForNextUpdate();
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(countryDetails);
        expect(result.current.error).toBe(null);


    });

    it('should handle error', async () => {
        const errorMessage = 'Network Error';

        mockedAxios.request.mockRejectedValueOnce(new Error(errorMessage));

        const { result, waitForNextUpdate } = renderHook(() => useCountry('USA'));

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBe(null);
        expect((result.current.error as any).message).toBe(errorMessage);
    });
});