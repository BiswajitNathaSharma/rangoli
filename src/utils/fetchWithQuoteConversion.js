const convertQuotesInObject = (obj) => {
    if (typeof obj === 'string') {
        return obj.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    } else if (Array.isArray(obj)) {
        return obj.map(item => convertQuotesInObject(item));
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = convertQuotesInObject(obj[key]);
            return acc;
        }, {});
    }
    return obj;
};

const fetchWithQuoteConversion = async (url, toggleLoading) => {
    try {
        toggleLoading(true); // Set loading to true
        const res = await fetch(url);
        const data = await res.json();
        const convertedData = convertQuotesInObject(data);
        toggleLoading(false); // Set loading to false
        return convertedData;
    } catch (error) {
        toggleLoading(true); // Set loading to false if there's an error
        console.log("error from fetching data:",error)
        throw error;
    }
};

export default fetchWithQuoteConversion;
