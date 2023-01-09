// w tym pliku będziemy czerpać dane z pliku forecast.js
// ważne, aby w tej sytuacji skrypt z forecast.js był w html wyżej app.js

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
// Ta zmienna uaktualnia tylko interfejs, nie komunikację z API

    // console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    // to dłuższa wersja tego, co jest pod spodem!
    
    // decontructing properties - tworzy zmienne w krótszy sposób
    const {cityDets, weather} = data;

    //  to kody dodający html do <div> z 28 linijki html
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>

        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `icons/icons/${weather.WeatherIcon}.svg`;
    // zmienna interpoluje z plik z folderu -> pliki w folderze to liczby -> jej wybór zależy
    // od property z weather, które też są cyframi;

    icon.setAttribute('src', iconSrc);
    // nadaje zmiennen icon - która ma querySelectora z html - atrybut src którego value to zmienna z adresem folderu
    
    let timeSrc = weather.IsDayTime ? 'icons/day.svg' : 'icons/night.svg';

    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'icons/day.svg';
    // } else {
    //     timeSrc = 'icons/night.svg';
    // }
    time.setAttribute('src', timeSrc);
    // nadaje do img.time(zmnienna time) atrybut src o nazwie timeSrc, 
    // czyli odwołujący się do adresów z pętli;
    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-nonoe');
    };
};

// zmienna, która aktualizuje miasto, ma 
const updateCity = async (city) => {

    const cityDets = await getCity(city);
    // ta zmienna przyporządkowana będzie do tego zo
    // używamy await, aby być pewnym że getCity(city) się wykonało; 
    // getCity(city) jest funkcją async z forecast.js, zwraca promise i też
    // dlatego możemy użyć await
    const weather = await getWeather(cityDets.Key);
    // ta zmienna czerpie ze zmiennej cityDets;
    // czeka na wykonanie getCity

    return { cityDets, weather};
    // zwraca obiekt
    // return {
    //     cityDets: cityDets,
    //     weather: weather
    // };
    // to dłuższa wersja tego returna, w obiekcie są property i value
    // value zmienne cityDets i weather
    //  kiedy property i value są takie same, można to właśnie tak skrócić

    // jeżeli funkcja ma zwrócić dwa niezależne elementy, z dwóch różnych requestów
    // to muszę zwrócić to jako obiekt!!
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // formularz - to co wpisujemy
    const city = cityForm.city.value.trim()
    // trim resetuje puste pola typu spacje - to ważne, bo bez tego nie odwołamy się
    //  poprawnie do API, spacja będzie uznana jako zbędny znak;
    // cityForm to zmienna odwołująca się do formularza, city to jej name, value to to co wpiszemu w Form
    cityForm.reset();
    // .reset() sprawia, że po wciśnięciu enter formularz nam się resetuje, czyści;

// wywołujemy funkcję update(city) --> to promise
    updateCity(city)
        .then(data => updateUI(data))
        // data zwracana to obiekt z returna z updateUI
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
    // storuje dane ze zmiennej city, która bierze dane z form fielda;
    // dane będą widoczne w sekcji app w dev tools

});

if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};
// jeśli możliwe będzie pobranie danych(a będzie dzięki localStorage.setItem)
// strona po odświeżeniu będzie czerpać dane z właśnie local storage
