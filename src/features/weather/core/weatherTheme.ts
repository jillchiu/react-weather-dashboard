import { type WeatherTheme } from "../model/types"

export function getWeatherTheme(weather: string, isNight: boolean): WeatherTheme {

    if(isNight){

        switch (weather) {

            //clear night
            case 'sunny':
                return {
                    background: 'from-slate-950 via-slate-900 to-blue-950',
                    text: 'text-slate-50',
                    subText: 'text-slate-400',

                    card: 'bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl',
                    secondaryCard: 'bg-white/5 backdrop-blur-md border border-white/5',

                    border: 'border-white/10',

                    chartAxis: 'rgba(255,255,255,0.70)',
                    chartGrid: 'rgba(255,255,255,0.10)'

                }

            //clouds night
            case 'cloudy':
                return {
                    background: 'from-slate-900 via-slate-800 to-slate-700',
                    text: 'text-slate-100',
                    subText: 'text-slate-400',

                    card: 'bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl',
                    secondaryCard: 'bg-white/5 backdrop-blur-md border border-white/5',

                    border: 'border-white/10',

                    chartAxis: 'rgba(255,255,255,0.68)',
                    chartGrid: 'rgba(255,255,255,0.10)'

                }

            //rain night
            case 'rainy':
                return {
                    background: 'from-slate-950 via-blue-950 to-slate-800',
                    text: 'text-slate-100',
                    subText: 'text-slate-400',

                    card: 'bg-slate-100/10 backdrop-blur-xl border border-white/5 shadow-2xl',
                    secondaryCard: 'bg-slate-100/5 backdrop-blur-md border border-white/5',

                    border: 'border-white/5',

                    chartAxis: 'rgba(255,255,255,0.75)',
                    chartGrid: 'rgba(255,255,255,0.12)'

                }

            //thunderstorm night
            case 'stormy':
                return {
                    background: 'from-slate-950 via-slate-900 to-indigo-950',
                    text: 'text-slate-50',
                    subText: 'text-slate-400',

                    card: 'bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-2xl',
                    secondaryCard: 'bg-slate-900/15 backdrop-blur-md border border-white/5',

                    border: 'border-white/5',

                    chartAxis: 'rgba(255,255,255,0.80)',
                    chartGrid: 'rgba(255,255,255,0.15)',

                }

            //snowy night
            case 'snowy':
                return {
                    background: 'from-slate-900 via-blue-900 to-slate-700',
                    text: 'text-slate-50',
                    subText: 'text-slate-300',

                    card: 'bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl',
                    secondaryCard: 'bg-white/5 backdrop-blur-md border border-white/5',

                    border: 'border-white/10',

                    chartAxis: 'rgba(255,255,255,0.65)',
                    chartGrid: 'rgba(255,255,255,0.10)'

                }

            default:
                return {
                    background: 'from-slate-900 via-slate-800 to-slate-700',
                    text: 'text-slate-100',
                    subText: 'text-slate-400',

                    card: 'bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl',
                    secondaryCard: 'bg-white/5 backdrop-blur-md border border-white/5',

                    border: 'border-white/10',

                    chartAxis: 'rgba(255,255,255,0.68)',
                    chartGrid: 'rgba(255,255,255,0.10)'

                }
        }

    }else{

        switch (weather) {

            //sunny day
            case 'sunny':
                return {
                    background: 'from-sky-300 via-blue-200 to-cyan-100',
                    text: 'text-slate-900',
                    subText: 'text-slate-600',

                    card: 'bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl',
                    secondaryCard: 'bg-white/20 backdrop-blur-md border border-white/20',

                    border:'border-white/30',

                    chartAxis: 'rgba(15,23,42,0.65)',
                    chartGrid: 'rgba(15,23,42,0.08)'

                }

            //cloudy day
            case 'cloudy':
                return {
                    background: 'from-slate-300 via-slate-200 to-gray-100',
                    text: 'text-slate-900',
                    subText: 'text-slate-600',

                    card: 'bg-white/35 backdrop-blur-xl border border-white/40 shadow-2xl',
                    secondaryCard: 'bg-white/20 backdrop-blur-md border border-white/20',

                    border:'border-white/30',

                    chartAxis: 'rgba(15,23,42,0.60)',
                    chartGrid: 'rgba(15,23,42,0.08)'

                }

            //rainy day
            case 'rainy':
                return {
                    background: 'from-slate-600 via-blue-500 to-slate-400',
                    text:  'text-slate-100',
                    subText: 'text-slate-300',

                    card: 'bg-slate-100/10 backdrop-blur-xl border border-white/10 shadow-2xl',
                    secondaryCard: 'bg-slate-100/10 backdrop-blur-md border border-white/5',

                    border:'border-white/10',

                    chartAxis: 'rgba(255,255,255,0.75)',
                    chartGrid: 'rgba(255,255,255,0.12)'

                }

            //stormy day
            case 'stormy':
               return {
                    background: 'from-slate-800 via-slate-700 to-blue-700',
                    text: 'text-slate-100',
                    subText: 'text-slate-400',

                    card: 'bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-2xl',
                    secondaryCard: 'bg-slate-900/15 backdrop-blur-md border border-white/5',

                    border:'border-white/5',

                    chartAxis: 'rgba(255,255,255,0.80)',
                    chartGrid: 'rgba(255,255,255,0.15)'

                }

            //snowy day
            case 'snowy':
                return {
                    background: 'from-slate-100 via-blue-100 to-cyan-50',
                    text: 'text-slate-800',
                    subText: 'text-slate-500',

                    card: 'bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl',
                    secondaryCard: 'bg-white/25 backdrop-blur-md border border-white/30',

                    border:'border-white/40',

                    chartAxis: 'rgba(51,65,85,0.60)',
                    chartGrid: 'rgba(51,65,85,0.08)'

                }

            default:
                return {
                    background: 'from-slate-300 via-slate-200 to-gray-100',
                    text: 'text-slate-900',
                    subText: 'text-slate-600',

                    card: 'bg-white/35 backdrop-blur-xl border border-white/40 shadow-2xl',
                    secondaryCard: 'bg-white/20 backdrop-blur-md border border-white/20',

                    border:'border-white/30',

                    chartAxis: 'rgba(15,23,42,0.60)',
                    chartGrid: 'rgba(15,23,42,0.08)'
                }
        }

    }
}