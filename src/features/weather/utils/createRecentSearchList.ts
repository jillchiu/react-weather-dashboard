export function createRecentSearchList(city: string, list:string[]){
    return[city, ...list.filter(item => item.toLowerCase()!= city.toLowerCase())].slice(0, 5)
    
}