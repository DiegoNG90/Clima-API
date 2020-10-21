console.log("Canal API linkeado");

let api;

function peticionClima(){
    // fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=5b21a90adc533c87f4debbcc0fe00773')
    let ciudad = document.querySelector('#user-city').value;
    document.querySelector('#city-display').textContent = ciudad;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=5b21a90adc533c87f4debbcc0fe00773`)
    .then(function(response){
        return response.json();
    })
    .then(response => api = response)    
    .then(function(response){
        peticionData(response);
    })
    .catch(function (err){
        console.error(err);
    });
}
const $btnBuscar = document.querySelector('#buscar');
$btnBuscar.onclick = peticionClima;

const $boton = document.querySelector('#btn');
$boton.onclick = function(e){
    document.querySelector('.main').className = "";
};

function kelvinACelcius (tempEnK){
    let celcius = tempEnK - 273.15;
    return ` ${Math.round(celcius)} °C `;
}

function peticionData(data){
    document.querySelector('#clima-actual').textContent = api.weather[0].main;
    document.querySelector('#temperatura').textContent = kelvinACelcius(api.main.temp);

    document.querySelector('#wicon').setAttribute('src', `http://openweathermap.org/img/w/${api.weather[0].icon}.png`);
    document.querySelector('#micon').setAttribute('href', `http://openweathermap.org/img/w/${api.weather[0].icon}.png`);

    document.querySelector('#st').textContent =  `ST: ${kelvinACelcius(api.main.feels_like)} `;
    document.querySelector('#viento').textContent = `Wind: ${api.wind.speed} km/h`;
    document.querySelector('#humedad').textContent =  `Humidity: ${api.main.humidity}%`;
    document.querySelector('#presion').textContent =  `Pressure: ${api.main.pressure} mb*`;
    document.querySelector('#visibility').textContent =  `Visibility: ${api.visibility} meters`;
    document.querySelector('#min').textContent =  kelvinACelcius(api.main.temp_min);
    document.querySelector('#max').textContent =  kelvinACelcius(api.main.temp_max);
}


