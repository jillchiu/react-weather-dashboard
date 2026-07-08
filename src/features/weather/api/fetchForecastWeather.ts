import { mapForecastWeather } from "../mapper/mapForecastWeather";
import { mapHttpError } from "../model/errors";
import type { ApiError, ForecastWeatherData, Result } from "../model/types";

export async function fetchForecastWeather(city: string, signal?: AbortSignal): Promise<Result<ForecastWeatherData, ApiError>>{

    try{
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)

        if(!res.ok){
            return {ok: false, error: mapHttpError(res.status)}
        
        }else{
            const data = await res.json()

            if(!data.list.length){
                
                return {ok: false, error: {type: 'INVALID_DATA'}}

            }

            return {ok: true, data: mapForecastWeather(data)}

        }

    } catch (err) {
        if(err instanceof DOMException && err.name === 'AbortError'){
            return {ok: false, error: {type: 'ABORT'}}

        }

        return {ok: false, error: {type: 'NETWORK'}}

    }

}