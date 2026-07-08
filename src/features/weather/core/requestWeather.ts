import { fetchWeather } from "../api/fetchWeather"
import type { WeatherData, ApiError, Result } from "../model/types"
import { weatherCache, type CacheEntry } from "./weatherCache"

export default async function requestWeather(city: string, controller: AbortSignal): Promise<Result<CacheEntry<WeatherData>, ApiError>>{
    
    const cached = weatherCache.get(city)

    const isFresh = cached && !weatherCache.isStale(city)

    if(isFresh){
        return {ok: true as const, data: { data: cached.data, timestamp: cached.timestamp} }

    }

    const result = await fetchWeather(city, controller)

    if(!result.ok){
        return result

    }

    await weatherCache.set(city, result.data)

    const entry = weatherCache.get(city)

    return {ok: true, data: {data: entry?.data, timestamp: entry!.timestamp}}

} 