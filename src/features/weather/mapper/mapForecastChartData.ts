import type { ForecastDatView, Unit, ForecastWeatherData } from "../model/types";
import { temperatureConvert } from "../utils/temperature";

export default function mapForecastChartData(forecastData:ForecastWeatherData, unit:Unit): ForecastDatView[]{
    
    return forecastData.days.map((day)=>{
            const data = day.items.map((item)=>({
                time: item.dt_txt.split(' ')[1]?.substring(0, 2) ?? "",

                temp: temperatureConvert(item.main.temp, unit),

                pop: item.pop,

                icon: item.weather[0]?.icon ?? "",

            }))

            const noonItem = day.items.find(item => item.dt_txt.includes('12:00:00'))

            const icon = noonItem?.weather[0]?.icon ?? ""
            const daytimeWeather = noonItem?.weather[0]?.main ?? ""

            return{
                date: day.date,

                icon,
                main: daytimeWeather,

                maxTemp: Math.max(...data.map(item=>item.temp)),
                minTemp: Math.min(...data.map(item=>item.temp)),

                pop: Math.max(...data.map(item=>item.pop)),

                data

            }
        })

}