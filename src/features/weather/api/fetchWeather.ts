import { mapWeather } from '../mapper/mapWeather'
import { mapHttpError } from '../model/errors'
import type { WeatherData, Result, ApiError } from '../model/types'

export async function fetchWeather (city: string, signal?: AbortSignal): Promise<Result<WeatherData, ApiError>> {

    try{

      const apiKey = import.meta.env.VITE_WEATHER_API_KEY

      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, { ...(signal? {signal}: {}) })

      if(!res.ok){

        return {
          ok: false,
          error: mapHttpError(res.status)
          
        }

      }else{

        const data = await res.json()

        if(!data.weather?.length) {

          return {
            ok: false,
            error: {type: 'INVALID_DATA'}

          }
          
        }

        return {
          ok: true,
          data: mapWeather(data)

        }

      }

    } catch(err){

        if(err instanceof DOMException && err.name === 'AbortError'){
          return{
            ok: false,
            error: { type: 'ABORT'}

          }
        }

        return {
          ok: false,
          error: { type: 'NETWORK'}

        }

    }

}