// this file is for adding functions that call user-related endpoints

import { useState, useEffect } from "react";

// returns any type T
// takes in url, options object including request method, headers, body, settings
type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const useFetch = <T>(url: string, options: RequestInit = {}) => {     
    // returns any type T, initially empty
    const [data, setData] = useState<T | null>(null);
    useEffect(() => {
        // fetch data function
        const fetchData = async () => {
            // specifies request method
            const response = await fetch(url, options);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, [url]);
    return data;
};

export default useFetch;

//example use: const useGet = <T>(url: string) => useFetch('https://api.example.com/data', { method: 'POST'});