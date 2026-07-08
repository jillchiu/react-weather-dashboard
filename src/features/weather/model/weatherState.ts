import type { WeatherData, ApiError } from "./types";

export type WeatherState = {
    status: 'idle' | 'success' | 'error'
    isFetching: boolean

    data: WeatherData | null
    error: ApiError | null

    timestamp: number
}