import React, { useState, useRef } from "react"
import type { WeatherTheme, Mode } from "../model/types"

type Props = {
  recentSearch: string[]
  isLoading: boolean

  onSearch: (city: string, mode: Mode, option?: {saveRecord?: boolean}) => Promise<void>

  theme: WeatherTheme

  mode: Mode

}

export default function SearchBar({
  recentSearch, 
  isLoading, 
  onSearch,
  theme,
  mode

}: Props){

  const hasRecentSearch = recentSearch.length > 0

  const [inputValue, setInputValue] = useState<string>('')

  const [isSearching, setIsSearching] = useState<boolean>(false)

  const [isSelecting, setIsSelecting] = useState<number>(-1)

  const draft = useRef<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
  
    draft.current = e.target.value

    setInputValue(e.target.value)
    
  }

  function handleSubmitByInput(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault()

    handleSubmit(inputValue)

  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>){
      
    let nextIndex: number

    if(e.key === 'Escape'){
      setIsSearching(false)     
      inputRef.current?.blur()

    }else if(e.key === 'ArrowUp'){

      e.preventDefault()
      
      setIsSelecting(prev => {

        if(prev < 0){
          nextIndex = recentSearch.length-1
        }else{
          nextIndex = prev-1
        }

        if(nextIndex === -1){

          setInputValue(draft.current)

        }else{
          setInputValue(recentSearch[nextIndex] || '')
        }

        return nextIndex

      })

    }else if(e.key === 'ArrowDown'){

      e.preventDefault()

      setIsSelecting(prev =>{

        if(prev >= recentSearch.length -1) {
          nextIndex = -1
        }else{
          nextIndex = prev+1
        }
        
        if(nextIndex === -1){

          setInputValue(draft.current)

        }else{
          setInputValue(recentSearch[nextIndex] || '')
        }

        return nextIndex

      })

    }

  }

  async function handleSubmit(rawValue: string){

    const city = rawValue.trim()

    if(city === '') return

    await onSearch(city, mode, {saveRecord: true})

    setIsSelecting(-1)
    draft.current = ''
    setInputValue('')
    inputRef.current?.blur()
    setIsSearching(false)

  }

  return(
    <div className="flex justify-center">
        <div className='relative'>
          <form onSubmit={handleSubmitByInput} className="flex items-center gap-2 w-[360px]">
            <input type='text' 
                   ref={inputRef} 
                   placeholder='🔍 Search city...' 
                   disabled={isLoading} 
                   className={`w-full h-12 text-lg bg-white/70 backdrop-blur-sm border ${theme.border} text-left rounded-full px-5 outline-none ${!isSearching && 'cursor-pointer'} focus:ring-2 focus-ring-white/40`}
                   value={inputValue} 
                   onChange={handleInputChange} 
                   onFocus={() => setIsSearching(true)} 
                   onBlur={() => setIsSearching(false)} 
                   onKeyDown={handleKeydown}
            />
            
            {isSearching && (
              <>
                {hasRecentSearch ? (
                  <div className={`absolute top-full left-0 mt-2 bg-white/70 border rounded-2xl shadow-lg overflow-hidden z-10 w-[360px] backdrop-blur-xl ${theme.border}`}>
                    {recentSearch.map((city: string, index: number)=>(
                      <div key={city} 
                           onMouseEnter={()=> !isLoading && setIsSelecting(index)} 
                           onMouseLeave={()=> !isLoading && setIsSelecting(-1)} 
                           onMouseDown={()=> !isLoading && handleSubmit(city)} 
                           className={`px-4 py-3 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} ${isSelecting === index ? 'bg-white/40': ''} transition-colors duration-500 text-left`}>
                          {city}
                      </div>

                    ))}

                  </div>

                ):(
                  <div className='absolute top-full left-0 mt-2 bg-white/70 border rounded-2xl shadow-lg overflow-hidden z-10 w-[360px] backdrop-blur-xl border-white/30'>
                    <div className={`px-4 py-3 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} transition-colors duration-500 text-left text-gray-500`}>No recent record</div>
                  </div>

                )}

              </>

            )}

          </form>

        </div>

      </div>
      
  )
}