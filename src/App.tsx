import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './App.scss';


interface LocationAllow {
    answer: boolean;
}

interface DataLocation {
    name: string;
    weather: Weather[];
    main: Main;
    wind: Wind;
    clouds: {
        all: number
    };
    sys: Sys;
}

interface Weather {
    description: string;
    main: string
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface Wind {
    speed: number;
    deg: number;
}

interface Sys {
    country: string;
    sunrise: number;
    sunset: number;
}

const App: React.FC = () => {
    const [locationAllow, setLocationAllow] = useState<LocationAllow>({ answer: false });
    const [weather, setWeather] = useState<DataLocation>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            getLocationData(pos.coords.latitude, pos.coords.longitude)
            setLocationAllow({ answer: true });
        })
    }, [])

    let getLocationData = async (lat: number, long: number) => {
        let response = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: lat,
                lon: long,
                appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
                lang: 'pt',
                units: 'metric'
            }
        });

        setWeather(response.data);
    }

    if (locationAllow.answer === false) {
        return (
            <Fragment>
                <h3>Precisamos acessar sua localização para pegar os dados do tempo.</h3>
            </Fragment>
        );
    } else if (weather === undefined) {
        return (
            <Fragment>
                <h3>Estamos carregando os dados da sua localização. </h3>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
            <div className="mainRole">
                <h3>O clima em {weather?.name}</h3>
                <ul>
                    <li><span>País:</span> <strong>{weather?.sys.country}</strong></li>
                    <li><span>Temperatura: </span></li>
                    <li><span>Nuvens:</span></li>
                    <li><span>Umidade:</span></li>
                    <li><span>Pressão:</span></li>
                    <li><span>Velocidade do vento:</span></li>
                </ul>
            </div>
        </Fragment>
        );
    }
}

export default App;
