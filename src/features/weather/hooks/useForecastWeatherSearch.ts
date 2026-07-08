import { useRef, useState } from "react";
import type { ForeWeatherState } from "../model/foreWeatherState";
import requestForecastWeather from "../core/requestForecastWeather";

export function useForecastWeatherSearch(){

    const [state, setState] = useState<ForeWeatherState>({data: null, isFetching: false, status: 'idle', error: null})

    const controllerRef = useRef<AbortController | null>(null)
    const requestRef = useRef(0)

    async function submitForecastSearch(city: string){

        controllerRef.current?.abort()

        const controller = new AbortController()

        controllerRef.current = controller

        const signal = controller.signal

        const requestId = ++requestRef.current

        setState(prev => ({...prev, isFetching: true}))

        const result = await requestForecastWeather(city, signal)

        if(requestId !== requestRef.current) return


        if(result.ok){
            setState({isFetching: false, status: 'success', data: result.data.data, error: null})

        }else{

            if(result.error.type === 'ABORT'){
                setState(prev => ({...prev, isFetching: false}))
            
                return result

            }

            setState(prev => ({...prev, isFetching: false, error: result.error}))

        }

        return result

    }

    return {
        state, submitForecastSearch
    }

}