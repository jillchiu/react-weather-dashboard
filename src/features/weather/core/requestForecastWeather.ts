import type { Result, ApiError, ForecastWeatherData } from "../model/types";
import { forecastWeatherCache, type CacheForeEntry } from "./forecastCache";
import { fetchForecastWeather } from "../api/fetchForecastWeather";


export default async function requestForecastWeather(city: string, controller:AbortSignal): Promise<Result<CacheForeEntry<ForecastWeatherData>, ApiError>>{

    const cached = forecastWeatherCache.get(city)

    const isFresh = cached && !forecastWeatherCache.isStale(city)

    if(isFresh) return {ok: true as const, data: {data: cached.data, timestamp: cached.timestamp}}

    const result = await fetchForecastWeather(city, controller)

    if(!result.ok) return result

    await forecastWeatherCache.set(city, result.data)

    const entry = forecastWeatherCache.get(city)

    return {ok: true, data: {data: entry?.data, timestamp: entry!.timestamp}}

}