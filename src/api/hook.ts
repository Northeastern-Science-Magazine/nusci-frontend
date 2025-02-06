import { useState, useEffect } from "react";

// returns any type T
const useFetch = <T>(url: string) => {
    // returns any type T, initially empty
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        // fetch data function
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, [url]);

    return data;
};

export default useFetch;
