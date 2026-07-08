import type { WeatherData, Unit, WeatherTheme } from "../../model/types"
import LoadingSpinner from "../LoadingSpinner"
import { formatVisibility, temperatureConvert } from "../../utils/temperature"
import { formatTimeAgo } from "../../utils/formatTimeAgo"
import { useEffect, useState } from "react"

type Props = {
  weatherData: WeatherData | null
  unit: Unit
  isLoading: boolean
  onUnitChange: (unit: Unit) => void
  theme: WeatherTheme
  timestamp: number

}

export default function CurrentWeather({
  weatherData, unit, isLoading, onUnitChange, theme, timestamp

}: Props){

  const [now, setNow] = useState<number>(Date.now())

  useEffect(()=>{

    const timer = setInterval(() => {
      setNow(Date.now())
    }, 60000)

    return () => clearInterval(timer)

  }, [])
  
  const afterFetch = formatTimeAgo(timestamp, now)

  if(!weatherData) return null

  return(

    <div className="flex flex-col gap-4 mt-4">

        <LoadingSpinner isLoading={isLoading} />

        <div className="flex flex-col items-center gap-4">

          <img className="w-28 h-28" src={`https://openweathermap.org/payload/api/media/file/${weatherData.icon}.png`} />

        </div>
        
        <h1 className={`text-5xl font-light tracking-tight ${theme.text}`}>{weatherData.city}, {weatherData.country}</h1>

        <div className="relative">
            <div className={`text-7xl font-extralight text-center ${theme.text}`}>
                {temperatureConvert(weatherData.temp, unit)}° 
            </div>

            <div className="absolute right-0 bottom-2 flex items-center text-2xl">
              <button className={`transition-colors ${ unit === 'C' ? `${theme.text} pointer-events-none`: 'text-black/30 cursor-pointer'}`}
                      onClick={()=> onUnitChange('C')}>
              C
              </button>

              <span className="text-black/20 px-1">/</span>

              <button className={`transition-colors ${ unit === 'F' ? `${theme.text} pointer-events-none`: 'text-black/30 cursor-pointer'}`}
                      onClick={()=> onUnitChange('F')}>
              F
              </button>

            </div>

        </div>
          
        <div className={`text-lg ${theme.subText}`}>
          <p>{weatherData.description}</p>
        </div>

        <div className={`text-xs mt-1 ${theme.subText}`}>
          <p>{afterFetch}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={`rounded-2xl ${theme.secondaryCard} p-4 transition-all duration-300 hover:scale-[1.02]`}>

            <div className="flex flex-col gap-1">
              <span className={`text-sm ${theme.subText}`}>
                Feels like
              </span>

              <span className={`text-2xl font-light ${theme.text}`}>
                {temperatureConvert(weatherData.feels_like, unit)}°{unit}
              </span>

            </div>
          </div>
          

          <div className={`rounded-2xl ${theme.secondaryCard} p-4 transition-all duration-300 hover:scale-[1.02]`}>
          
            <div className="flex flex-col gap-1">
              <span className={`text-sm ${theme.subText}`}>
                  Humidity
                </span>

                <span className={`text-2xl font-light ${theme.text}`}>
                  {weatherData.humidity} %
                </span>

            </div>
          </div>

          
          <div className={`rounded-2xl ${theme.secondaryCard} p-4 transition-all duration-300 hover:scale-[1.02]`}>
          
            <div className="flex flex-col gap-1">
              <span className={`text-sm ${theme.subText}`}>
                Wind
              </span>

              <span className={`text-2xl font-light ${theme.text}`}>
                {weatherData.wind} m/s
              </span>

            </div>
          </div>
          

          <div className={`rounded-2xl ${theme.secondaryCard} p-4 transition-all duration-300 hover:scale-[1.02]`}>

            <div className="flex flex-col gap-1">
              <span className={`text-sm ${theme.subText}`}>
                Visibility
              </span>

              <span className={`text-2xl font-light ${theme.text}`}>
                {formatVisibility(weatherData.visibility)} km
              </span>

            </div>
          </div>

        </div>
    
    </div>
       
  )
}