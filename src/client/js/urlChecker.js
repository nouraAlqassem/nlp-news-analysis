const validUrl = require('valid-url');


export const isValidUrl = (url) => {
    console.log("Checking URL validity:", url); 
    return Boolean(validUrl.isWebUri(url));
};