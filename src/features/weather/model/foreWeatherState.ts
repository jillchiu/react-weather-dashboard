import type { ForecastWeatherData, ApiError } from "./types";

export type ForeWeatherState = {
    status: 'idle' | 'success' | 'error'
    isFetching: boolean

    data: ForecastWeatherData | null
    error: ApiError | null

}