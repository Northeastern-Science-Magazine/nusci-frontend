import { useState, useEffect } from "react";

// returns any type T
const useFetch = <T>(url: string) => {
    // returns any type T, initially empty
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [url]);

    return [data];
};

export default useFetch;