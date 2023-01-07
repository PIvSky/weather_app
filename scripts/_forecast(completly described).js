const key = 'ySZSFyK6qGFj5DARYo2kZj6PdsWrINN3';
// klucz dostępu do API

// getting weather information
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    // bazowe API do którego robimy request
    const query = `${id}?apiKey${key}`;
    // będzie za chwile częścią fetcha, zawiera id miasta oraz klucz - są zawarte jako
    // interpolacja kontynuacji API

    const response = await fetch(base + query);
    // zmienna która pobiera dane z połączonych zmiennych base i query
    const data = await response.json();
    // zwraca promise!

    return data[0];
    // zwraca tylko pierwszy obiekt (ten potrezebny)
    // z całego zbioru obiektów które tam są;
}

// getting city information
const getCity = async (city) => {

    const base ='http://dataservice.accuweather.com/locations/v1/cities/search';
    // base API to which we make request
    const query = `?apikey=${key}&${city}`;
    // we make a city paremeter which we will can invoke in future;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};