import { type ApiError } from "./types"

export function mapHttpError(status: number): ApiError{

  switch (status){
    case 404:
      return{type: 'API_NO_CITY'}

    case 429:    
      return{type: 'API_LIMIT'}

    default:
      return{type: 'UNKNOWN'}

  }

}

export function getErrorMessage(err: ApiError): string{

  switch(err.type) {
    case "NETWORK":
      return "Network error"

    case "API_NO_CITY":
      return "City not found"

    case "API_LIMIT":
      return "Rate limit exceeded"

    case "INVALID_DATA":
      return "Invalid data"

    case "UNKNOWN":
      return "Unknown error"

    case "ABORT":
      return "Abort error"

  }
}

export function shouldRetry(err: ApiError){
  
  switch (err.type){

    case "NETWORK":
      return true

    case "API_NO_CITY":
      return false

    case "API_LIMIT":
      return true

    case "INVALID_DATA":
      return false

    case "UNKNOWN":
      return false

    case "ABORT":
      return false

  }
}