import type { WeatherMain, WeatherMainCategory } from "../model/types";

export function mapWeatherCategory(weather: WeatherMain): WeatherMainCategory{

    switch(weather){
        case 'Clear':
            return 'sunny'

        case 'Clouds':
        case 'Mist':
        case 'Fog':
        case 'Haze':
        case 'Smoke':
        case 'Dust':
        case 'Sand':
        case 'Ash':
            return 'cloudy'
            
        case 'Rain':
        case 'Drizzle':
            return 'rainy'

        case 'Thunderstorm':
        case 'Squall':
        case 'Tornado':
            return 'stormy'

        case 'Snow':
            return 'snowy'
        
        default:
            return 'cloudy'

    }

}