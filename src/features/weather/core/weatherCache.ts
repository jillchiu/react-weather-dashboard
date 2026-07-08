import type { WeatherData } from "../model/types"

export type CacheEntry<T> = {
    data: T
    timestamp: number
    
}

export function createCache<T>(ttl: number){
    const store = new Map<string, CacheEntry<any>>()


    function set(key: string, data: T) {
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
        store.delete(key)
    }


    function getOrFetch<T>(
        key: string,
        fetcher: () => Promise<T>
    ): Promise<T> {

        const entry = store.get(key)

        if(entry?.data){
            return Promise.resolve(entry.data)
        }

        const promise = fetcher().then((data) => {
            // Store successful response in cache
            store.set(key, {data, timestamp: Date.now()})

            return data

        })

        return promise

    }

    return{
        set, get, getWithMeta, isStale, has, clear, getOrFetch

    }

}


export const weatherCache = createCache<WeatherData>(
    1000 * 60 * 5//5min ttl

)