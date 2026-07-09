import { useState, useEffect } from 'react'
import { getUnit, getRecentSearch, saveRecentSearch, saveUnit, saveMode, getMode, saveTheme, getTheme } from './features/weather/utils/weatherStorage'
import WeatherCard from './features/weather/components/weather/WeatherCard'
import ErrorMessage from './features/weather/components/ErrorMessage'
import SearchBar from './features/weather/components/SearchBar'
import { useWeatherSearch } from './features/weather/hooks/useWeatherSearch'
import { createRecentSearchList } from './features/weather/utils/createRecentSearchList'
import LoadingSpinner from './features/weather/components/LoadingSpinner'
import { getWeatherTheme } from './features/weather/core/weatherTheme'
import { mapWeatherCategory } from './features/weather/mapper/mapWeatherCategory'
import type { Mode, Unit } from './features/weather/model/types'
import { useForecastWeatherSearch } from './features/weather/hooks/useForecastWeatherSearch'

function App() {

  //ui related
  const [unit, setUnit] = useState<Unit>(()=> getUnit())

  const [recentRecord, setRecentRecord] = useState<string[]>(()=>{
      
    const stored = getRecentSearch()

    return stored ? JSON.parse(stored) : []
    
  })

  const [city, setCity] = useState<string>(()=>{
    
    const stored = getRecentSearch()

    const recent = stored ? JSON.parse(stored) : []

    return recent[0] ?? 'Tokyo'
  
  })

  useEffect(()=>{
    saveUnit(unit)
  
  }, [unit])

  //current api search
  const {state: weatherState, submitSearch} = useWeatherSearch()

  const {state: forecastState, submitForecastSearch} = useForecastWeatherSearch()

  async function handleSearch(city: string, mode: Mode, option?: {saveRecord?: boolean}):Promise<void>{

    if(mode==='current'){
      const result = await submitSearch(city)

      if(result?.ok){

        if(option?.saveRecord !== false){

          const updated = createRecentSearchList(city, recentRecord)

          setRecentRecord(updated)

          saveRecentSearch(updated)
        }

        setCity(result.data.data.city)

      }

      // return result
    }else{
      const result = await submitForecastSearch(city)

      if(result?.ok){
        if(option?.saveRecord !== false){
          const updated = createRecentSearchList(city, recentRecord)

          setRecentRecord(updated)

          saveRecentSearch(updated)

        }

        setCity(result.data.data.city)

      }
      
    }

  }

  const savedTheme = getTheme()

  const category = mapWeatherCategory(weatherState.data?.main ?? savedTheme?.main ?? 'Clear')

  const isNight = weatherState.data?.icon.endsWith('n') ?? savedTheme?.isNight ?? false

  useEffect(() => {
    if(!weatherState.data) return

    saveTheme(weatherState.data.main, isNight)},
     
    [weatherState.data, isNight])

  const theme = getWeatherTheme(category, isNight)

  const [mode, setMode] = useState<Mode>(() => getMode())

  useEffect(() => {saveMode(mode)}, [mode])
  
  useEffect(()=>{
    handleSearch(city, mode, {saveRecord: false})

  }, [mode, city])

  const isLoading = weatherState.isFetching || forecastState.isFetching

  return (

    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-b transition-all duration-700 ease-in-out ${theme.background}`}>

      <title>Weather Dashboard</title>

      <div className={`${theme.card} p-10 rounded-3xl shadow-2xl text-center w-[420px] border ${theme.border} transition-all duration-700 flex flex-col gap-6 ${isLoading ? 'opacity-70 scale-[0.99]': 'opacity-100 scale-100'}` }>

          <SearchBar 
            recentSearch = {recentRecord}
            isLoading = {isLoading}
            onSearch = {handleSearch}
            theme = {theme}
            mode = {mode}
          />

          {isLoading &&(
            <div className='relative'>
              <LoadingSpinner isLoading={true} />
            </div>
          )}

          <WeatherCard
            weatherData = {weatherState.data}
            unit = {unit}
            isLoading = {false}
            onUnitChange = {setUnit}
            theme = {theme}
            timestamp = {weatherState.timestamp}
            mode = {mode}
            setMode = {setMode}
            forecastdata = {forecastState.data}
          />
              
          <ErrorMessage 
            error={(weatherState.error || forecastState.error) ?? null}
          />

      </div>
      
    </div>

  )
}

export default App