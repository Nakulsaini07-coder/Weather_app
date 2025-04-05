const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    // destructuring properties:
    const {cityDetails, weather} = data;        // it is the same as the above two lines.
    // data.cityDetails is stored in the same variable cityDetails and data.weather is stored in the same variable weather.

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `;

    // update the night/day & icon images
    const iconsrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconsrc);

    let timesrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timesrc);

    // remove d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        // cityDetails: cityDetails,
        // weather: weather
        // when the property name and the value are the same, we can use only the property name.
        cityDetails,            // also called object shorthand notation
        weather
        // we can't do the same when the property name and the value are different.
    }
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();             // prevent the page from refreshing

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();               // clear the form after submitting the city 

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}