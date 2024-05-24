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

const fetchWithQuoteConversion = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return convertQuotesInObject(data);
};

export default fetchWithQuoteConversion;
