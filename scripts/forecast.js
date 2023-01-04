const key = 'ySZSFyK6qGFj5DARYo2kZj6PdsWrINN3';

// getting weather information
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apiKey${key}`;

    const response = await fetch(base + query) ;
    const data = await response.json();
    // it returns a promise

    return data[0];
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
    // zwraca tylko pierwszy obiekt (ten potrezebny)
    // z całego zbioru obiektów które tam są;

};

getCity('manchester')
    .then(data => {return getWeather(data.Key);
    })
    .then(data => {console.log(data)})
    .catch(error => console.log(err));