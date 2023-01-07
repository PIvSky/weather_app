const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');



const updateUI = (data) => {

    // console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // decontructing properties
    const {cityDets, weather} = data;


    //  update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;</span>
        </div>
    `;
    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-nonoe');
    };

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
};


const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather};
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city Value
    const city = cityForm.city.value.trim()
    // trim resetuje puste pola typu spacje - to ważne, bo bez tego nie odwołamy się poprawnie do API, spacja będzie uznana jako zbędny znak;
    cityForm.reset();
    // .reset() sprawia, że po wciśnięciu enter formularz nam się resetuje, czyści;

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
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