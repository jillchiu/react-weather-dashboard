import type { Unit, Mode, WeatherMain } from "../model/types"

const RECENT_KEY = 'weather_recent_search'
const UNIT_KEY = 'weather_unit'
const MODE_KEY = 'weather_mode'
const THEME_KEY = 'weather_theme'

export function getUnit() : Unit {
    const unit = localStorage.getItem(UNIT_KEY)

    if(unit === 'F') return 'F'

    return 'C'

}

export function saveUnit(unit: Unit){
    localStorage.setItem(UNIT_KEY, unit)

}

export function getRecentSearch(){
    return localStorage.getItem(RECENT_KEY) || '[]'

}

export function saveRecentSearch(list: string[]){
    localStorage.setItem(RECENT_KEY, JSON.stringify(list))

}

export function getMode() : Mode {
    const mode = localStorage.getItem(MODE_KEY)

    if(mode === 'forecast') return 'forecast'

    return 'current'

}

export function saveMode(mode: Mode){
    localStorage.setItem(MODE_KEY, mode)
    
}

export function getTheme(){
    const stored = localStorage.getItem(THEME_KEY)

    if(!stored) return null

    return JSON.parse(stored) as {
        main: WeatherMain
        isNight: boolean
    }

}

export function saveTheme(main: WeatherMain, isNight: boolean){
    localStorage.setItem(THEME_KEY, JSON.stringify({main, isNight}))

}