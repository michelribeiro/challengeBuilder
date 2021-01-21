import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './App.scss';
import AppCard from './components/AppCard';
import AppMaps from './components/AppMaps';

import { DataLocation } from './Models/weather.model';
import { LocationAllowModel } from './Models/locationallow.model';
import { PositionModel } from './Models/position.model';

const mapUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`;
const apiWeather = `http://api.openweathermap.org/data/2.5/weather`;

const App: React.FC = () => {
    const [locationAllow, setLocationAllow] = useState<LocationAllowModel>();
    const [weather, setWeather] = useState<DataLocation>();
    const [position, setPosition] = useState<PositionModel>({ lat: 0, lng:0 });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            getLocationData(pos.coords.latitude, pos.coords.longitude)
            getAddress(pos.coords.latitude, pos.coords.longitude)
            setLocationAllow({ answer: true });
        }, () => {
            setLocationAllow({answer: false});
        })
    }, [])

    let getLocationData = async (lat: number, long: number) => {
        let response = await axios.get(apiWeather, {
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

    let getAddress = (lat: number, long: number) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`)
        .then(res => res.json())
        .then(data => setPosition({lat: lat, lng: long, address: data.results[0].formatted_address}))
        .catch(error => console.log(error))
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
                <main>
                    <AppCard {...weather} />
                    <AppMaps
                        {...position}
                        googleMapURL = {mapUrl}
                        containerElement = {<div style={{width:'480px', height: '400px'}} />}
                        mapElement = {<div style={{height: '100%'}} />}
                        loadingElement = {<p>Carregando o mapa.</p>}
                    />
                </main>
        </Fragment>
        );
    }
}

export default App;
