type Props = {
    isLoading: boolean

}

export default function LoadingSpinner({
    isLoading
    
}: Props){
        
    if(!isLoading) return null

        return(
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm rounded-3xl">
                <div className="h-10 w-10 rounded-full border-2 border-black/40 border-t-transparent animate-spin" /></div>

        )

}