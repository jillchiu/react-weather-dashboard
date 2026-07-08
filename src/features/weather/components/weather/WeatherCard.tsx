import type { ForecastWeatherData, Mode, WeatherData, Unit, WeatherTheme } from "../../model/types"
import React from "react"
import CurrentWeather from "./CurrentWeather"
import ForecastWeather from "./ForecastWeather"

type Props = {
  weatherData: WeatherData | null
  unit: Unit
  isLoading: boolean
  onUnitChange: (unit: Unit) => void
  theme: WeatherTheme
  timestamp: number

  mode: Mode
  setMode: React.Dispatch<React.SetStateAction<Mode>>

  forecastdata: ForecastWeatherData | null

}

export default function WeatherCard({
  weatherData, unit, isLoading, onUnitChange, theme, timestamp, mode, setMode, forecastdata

}: Props){

  return(
    <div className="relative min-h-[630px] transition-all duration-300">

      <div className="absolute top-0 right-0 flex items-center gap-2 p-1 rounded-full bg-white/10 backdrop-blur-sm">
      
        <button onClick={() => setMode('current')} className={`px-3 py-1.5 rounded-full text-sm transition-all ${theme.subText} ${mode === 'current' ? 'bg-white/10 backdrop-blur-md' : 'opacity-70 hover:opacity-100'} `}>Current</button>

        <button onClick={() => setMode('forecast')} className={`px-3 py-1.5 rounded-full text-sm transition-all ${theme.subText} ${mode === 'forecast' ? 'bg-white/10 backdrop-blur-md' : 'opacity-70 hover:opacity-100'} `}>Forecast</button>
      
      </div>

      { mode === 'current' ? 
        <div className="pt-10">

          <CurrentWeather 
            weatherData = {weatherData}
            unit = {unit}
            isLoading = {isLoading}
            onUnitChange = {onUnitChange}
            theme = {theme}
            timestamp = {timestamp}
          /> 

        </div>
        : 
        <div className="pt-14">

          <ForecastWeather 
            theme = {theme}
            unit = {unit}
            forecastdata = {forecastdata}
          />

        </div>
      }

    </div>    
    
  )
    
}