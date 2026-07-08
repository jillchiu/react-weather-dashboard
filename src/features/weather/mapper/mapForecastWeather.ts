import type { ForecastWeatherApiData, ForecastWeatherData, ForecastWeatherItem, ForecastDay } from "../model/types";

export function mapForecastWeather(data: ForecastWeatherApiData): ForecastWeatherData{

    const currentDay: ForecastDay[] = []

    let currentItems: ForecastWeatherItem[] = []
    let currentDate = ''

    let midnightCount = 0
    let started = false

    for (const item of data.list){
        const day = item.dt_txt.split(' ')[0]!
        const time = item.dt_txt.split(' ')[1]

        if(time === '00:00:00'){
            midnightCount++

            if(!started){
                started = true

            } else {
                currentItems = []
                
            }
        
            currentDate = day

            if(midnightCount === 4){
                break

            }

            currentDay.push({date:day, items: currentItems})

        }

        if(started){
            currentItems.push(item)

        }

    }

    return {
        city: data.city.name,
        days: currentDay

    }
}
