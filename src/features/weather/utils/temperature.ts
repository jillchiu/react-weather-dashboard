export function KtoF(e: number): number{
    return (e-273.15)*9/5+32
}

export function KtoC(e: number): number{
    return e-273.15
}

export function format(e: number): number{
    return Number(e.toFixed(1))
}

export function formatVisibility(e: number): number{
    return Number((e/1000).toFixed(1))
}

export function temperatureConvert(e: number, unit: string){

    return unit==='C' ? format(KtoC(e)) : format(KtoF(e))

}