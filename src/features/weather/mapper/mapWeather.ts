import type { WeatherApiData, WeatherData } from '../model/types'

export function mapWeather(data: WeatherApiData): WeatherData {

    const weatherItem = data.weather[0]

    return {
      city: data.name, 
      country: data.sys.country,
      temp: data.main.temp, 
      description: weatherItem?.description ?? "", 
      icon: weatherItem?.icon ?? "",
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      visibility: data.visibility,
      main: weatherItem?.main ?? 'Clear'

    }
    
}