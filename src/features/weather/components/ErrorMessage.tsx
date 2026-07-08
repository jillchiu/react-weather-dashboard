import type { ApiError } from "../model/types"
import { getErrorMessage } from "../model/errors"

type Props = {
    error: ApiError | null
    
}

export default function ErrorMessage({
    error

}:Props){

    if(!error) return null

    return (
        <p className='text-red-500 mt-4'>
           {getErrorMessage(error)}
        </p>
    )
}