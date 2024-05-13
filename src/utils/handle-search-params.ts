export const handleSearchParams = (searchParamsRaw: string) => {
    let queryString = searchParamsRaw?.split('?')[1];
    let obj: Record<string, string> = {};
    queryString = queryString?.split('#')[0];
    let arr = queryString?.split('&') || [];
    arr.forEach((value) => {
        let objTemp: Record<string, string> = {};
        objTemp[value?.split('=')[0]] = value?.split('=')[1];
        obj = {...obj, ...objTemp };
    });
    
    return obj;
};