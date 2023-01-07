const key = 'e08GLvntB1x1ODAHtVcAtWGq9lwoLY0k';

// getting weather information
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apiKey=${key}`;

    const response = await fetch(base + query) ;
    const data = await response.json();

    return data[0];
};

// getting city information
const getCity = async (city) => {

    const base ='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};