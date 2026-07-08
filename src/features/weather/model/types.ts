//current
export type WeatherData = {
    main: WeatherMain
    description: string
    icon: string

    temp: number
    feels_like: number
    humidity: number

    visibility: number

    wind: number

    country: string

    city: string

}

export type WeatherApiData = {
    
    weather: {
        main: WeatherMain
        description: string
        icon: string
    }[]

    main: {
        temp: number
        feels_like: number
        humidity: number
    }

    visibility: number

    wind: {
        speed: number
    }

    sys: {
        country: string
    }

    name: string

}

export type ForecastResult = Result<ForecastWeatherData, ApiError>

//forecast
export type ForecastWeatherApiData = {
    list: ForecastWeatherItem[]
    city: {
        name: string
        timezone: number
    }
}

export type ForecastWeatherItem = {
    dt: number
    
    weather: {
        main: WeatherMain
        description: string
        icon: string
    }[]

    main: {
        temp: number
    }
    
    pop: number
        
    dt_txt: string

}

export type ForecastDay = {
    date: string
    items: ForecastWeatherItem[]

}

export type ForecastWeatherData = {
    city: string
    days: ForecastDay[]

}

export type ForecastDatView = {
    date: string

    maxTemp: number
    minTemp: number

    pop: number
    main: string

    data: {
        time: string
        temp: number
        pop: number

        icon: string

    }[]

}


export type Result<T, E> = 
    | {ok: true; data: T}
    | {ok: false; error: E}


export type WeatherTheme = {
    background: string
    text: string
    subText: string

    card: string
    secondaryCard: string

    border: string

    chartAxis: string
    chartGrid: string
}

export type ApiError = 
    | {type: 'NETWORK'}
    | {type: 'API_NO_CITY'}
    | {type: 'API_LIMIT'}
    | {type: 'INVALID_DATA'}
    | {type: 'UNKNOWN'}
    | {type: 'ABORT'}

export type WeatherMain =
    |'Thunderstorm'
    |'Drizzle'
    |'Rain'
    |'Snow'
    |'Mist'
    |'Smoke'
    |'Haze'
    |'Dust'
    |'Fog'
    |'Sand'
    |'Ash'
    |'Squall'
    |'Tornado'
    |'Clear'
    |'Clouds'
    
export type WeatherMainCategory =
    |'sunny'
    |'cloudy'
    |'stormy'
    |'rainy'
    |'snowy'


export type WeatherIcon =
    |'☀️'
    |'☁️'
    |'🌩️'
    |'🌧'
    |'❄️'
    |'🌫'

export type Unit = 'C' | 'F'

export type Mode = 'current' | 'forecast'