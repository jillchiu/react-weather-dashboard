import type { ForecastWeatherData } from "../model/types";

export type CacheForeEntry<T> = {
    data: T
    timestamp: number
    
}

export function createForeCache<T>(ttl: number){
    const store = new Map<string, CacheForeEntry<any>>()

    function set(key: string, data: T){
        store.set(key, {data, timestamp: Date.now()})
    }

    function get(key: string){
        return store.get(key)
    }

    function getWithMeta(key: string){
        return store.get(key)?.timestamp
    }

    function isStale(key: string){
        const entry = store.get(key)

        if(!entry) return true

        return Date.now() - entry.timestamp > ttl
    }

    function has(key: string){
        return store.has(key)
    }

    function clear(key: string){
        return store.delete(key)
    }

    function getOrFetch<T>(key: string, fetcher: () => Promise<T>) : Promise<T> {
        const entry = store.get(key)

        if(entry?.data){
            return Promise.resolve(entry.data)
        
        }

        const promise = fetcher().then((data) => {
            store.set(key, {data, timestamp: Date.now()})

            return data
        
        })

        return promise

    }

    return{
        set, get, getWithMeta, isStale, has, clear, getOrFetch

    }

}

export const forecastWeatherCache = createForeCache<ForecastWeatherData>(1000 * 60 * 5)