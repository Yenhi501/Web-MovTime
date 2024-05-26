import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDebouncedValue } from "../redux/debouncedSlide";
import { RootState } from "../redux/store";

export const useDebounced = (value:string, delay: number) =>{
    const dispatch = useDispatch();
    const debouncedValue = useSelector((state: RootState)=>state.debounced.value);
    const [searchValue, setSearchValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(()=>{
            dispatch(setDebouncedValue(searchValue));
        },delay);
        return ()=>{
            clearTimeout(handler);
        };
    },[searchValue,delay,dispatch]);

    useEffect(() => {
        setSearchValue(value);
    }, [value]);
    
    return debouncedValue;
}