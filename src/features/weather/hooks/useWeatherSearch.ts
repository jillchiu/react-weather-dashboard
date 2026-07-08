import { useRef, useState } from "react";
import { type WeatherState } from "../model/weatherState";
import requestWeather from "../core/requestWeather";

export function useWeatherSearch(){

  const [state, setState] = useState<WeatherState>({isFetching: false, status: 'idle', timestamp: Date.now(), data: null, error: null})

  const controllerRef = useRef<AbortController | null>(null)
  const requestRef = useRef(0)

  async function submitSearch(city: string){
    
    controllerRef.current?.abort()

    const controller = new AbortController()

    controllerRef.current = controller

    const signal = controller.signal

    const requestId = ++requestRef.current

    setState(prev => ({...prev, isFetching: true}))

    const result = await requestWeather(city, signal)

    if(requestId !== requestRef.current) return

    if(result.ok){

      setState({isFetching: false, status: 'success', data: result.data.data, timestamp: result.data.timestamp, error: null})

    }else{
      
      if(result.error.type === 'ABORT') {
        setState(prev => ({...prev, isFetching: false}))
        
        return result

      }

      setState(prev => ({...prev, isFetching: false, error: result.error}))

    }

    return result

  }

  return{
    state, submitSearch

  }
}