import { useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import type { ForecastWeatherData, WeatherTheme, Unit } from "../../model/types"
import mapForecastChartData from "../../mapper/mapForecastChartData"

type Props = {
    theme: WeatherTheme
    unit: Unit

    forecastdata: ForecastWeatherData | null
    
}

export default function ForecastWeather({
    theme, unit, forecastdata

}:Props) {

    const [selectedDay, setSelectedDay] = useState(0)
    
    if(!forecastdata) return null

    const chardata = mapForecastChartData(forecastdata, unit)

    return (
        <div>
            
            <div className="flex justify-center">

                <div className='relative'>

                    <div className="absolute right-3 top-3 text-xs font-medium text-slate-400 tracking-wide">
                        °{unit}

                    </div>

                    <LineChart width={380} height={300} data={chardata[selectedDay]?.data ?? []} >

                        <Line type={"monotone"} dataKey={"temp"} stroke={theme.chartAxis} activeDot={{ r: 5 }} dot={false} />
                        <CartesianGrid stroke="none" />
                        <XAxis dataKey={"time"} axisLine={{ stroke: theme.chartGrid }} tick={{ fill: theme.chartAxis }} />
                        <YAxis width={30} axisLine={{ stroke: theme.chartGrid }} tick={{ fill: theme.chartAxis }} />

                        <Tooltip
                            labelFormatter={() => ''}
                            formatter={(value, name) => [`${value}°${unit}`, name]}
                            itemStyle={{color: 'blue'}}
                            contentStyle={{ borderRadius: '16px', border: `1px solid ${theme.chartGrid}`, background: theme.card, backdropFilter: 'blur(16px)', color: theme.chartAxis}}
                        />

                    </LineChart>

                </div>

            </div>


            <div className="flex items-center justify-center gap-4 mt-8 mb-8">
                <button onClick={() => setSelectedDay(prev => Math.max(0, prev-1))} 
                        disabled={ selectedDay===0 } 
                        className={`w-10 h-10 rounded-full ${theme.text} flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100`}>
                            ◀
                </button>

                <div className={`min-w-[120px] text-center text-lg font-medium ${theme.text}`}>
                    {selectedDay === 0 ? 'Tomorrow' : new Date(chardata[selectedDay]!.date).toLocaleDateString('en-US', {weekday: 'short'} )}

                </div>

                <button onClick={() => setSelectedDay(prev => Math.min(chardata.length -1 , prev+1))} 
                        disabled={ selectedDay === 2 } 
                        className={`w-10 h-10 rounded-full ${theme.text} flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100`}>
                            ▶
                </button>
                
            </div>


            <div className="grid grid-cols-2 gap-4">
                <div className={`rounded-2xl ${theme.secondaryCard} p-4`}>

                    <div className="flex flex-col items-center justify-center h-full">

                        <img className="w-16 h-16" src={`https://openweathermap.org/img/wn/${chardata[selectedDay]!.data[selectedDay]?.icon}@2x.png`} />

                        <div className={`text-3xl font-light ${theme.text}`}>
                            {chardata[selectedDay]!.main}

                        </div>

                        <div className={`text-lg ${theme.subText}`}>
                            💧 {chardata[selectedDay]!.pop * 100} %
                            
                        </div>

                    </div>

                </div>

                <div className={`rounded-2xl ${theme.secondaryCard} p-4 transition-all duration-300 hover:scale-[1.02]flex flex-col items-center justify-center h-full`}>

                    <div className={`text-4xl font-light ${theme.text}`}>
                        {chardata[selectedDay]!.maxTemp}°{unit}

                    </div>

                    <div className={`text-sm ${theme.subText}`}>
                        High

                    </div>

                    <div className="h-4" />

                        <div className={`text-4xl font-light ${theme.text}`}>
                            {chardata[selectedDay]!.minTemp}°{unit}
                        </div>

                        <div className={`text-sm ${theme.subText}`}>
                            Low
                        </div>

                    </div>

                </div>

            </div>

    )
}