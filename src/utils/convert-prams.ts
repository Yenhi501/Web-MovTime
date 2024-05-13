export const convertParams = (params: Record<string, string>) => {
    const convertedParams: Record<string, any> = {};
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            if (value === 'true' || value === 'false') {
                convertedParams[key] = value === 'true';
            } else if (!isNaN(Number(value))) {
                convertedParams[key] = Number(value);
            } else {
                convertedParams[key] = value;
            }
        }
        if (key === 'nation') {
            convertedParams[key] = decodeURIComponent(params[key]);
        }
    }

    return convertedParams;
};
