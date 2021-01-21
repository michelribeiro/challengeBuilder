import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './App.scss';
import { DataLocation } from './Models/weather.model';
import { LocationAllowModel } from './Models/locationallow.model';
import AppCard from './components/AppCard';
import { error } from 'console';

const App: React.FC = () => {
    const [locationAllow, setLocationAllow] = useState<LocationAllowModel>();
    const [weather, setWeather] = useState<DataLocation>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            getLocationData(pos.coords.latitude, pos.coords.longitude)
            setLocationAllow({ answer: true });
        }, () => {
            setLocationAllow({answer: false});
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

    if (locationAllow?.answer === false) {
        return (
            <React.Fragment>
                <h3>Precisamos acessar sua localização para pegar os dados do tempo.</h3>
            </React.Fragment>
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
                <AppCard {...weather}></AppCard>
        </Fragment>
        );
    }
}

export default App;
