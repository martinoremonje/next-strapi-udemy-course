import qs from "qs"
import { getStrapiURL } from "./api-helper"

export const fetchApi = async(
    path: string,
    urlParamsObjetc = {},
    options = {}
)=> {
    try {
        
        const mergedOptions = {
            ...options,
            headers: {
                "Content-Type": "application/json"
            }
        }

    const queryString = qs.stringify(urlParamsObjetc, {encodeValuesOnly: true})
    
    const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`

    const res = await fetch(requestUrl, mergedOptions);
    const data = await res.json();
    return data

    } catch (error) {
        console.log(error)
        throw new Error("Error fetching the data")
    }
}