import { useEffect, useRef, useState } from "react"


export const useFetch = (url) => {
    if(!url) throw Error('The URL is required!');
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        setState({ data: null, loading: true, error: null });
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(isMounted.current){
                    setState({
                        data: data,
                        loading: false,
                        error: null,
                    });
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: true,
                    error: "Unable to load information"
                })
            });
    }, [url]);

    return state;
}
