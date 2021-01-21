import React from 'react';
import { DataLocation } from '../Models/weather.model';

const AppCard = ({
    name,
    clouds,
    main,
    sys,
    wind,
    weather
}: DataLocation) => {

  return (
  <React.Fragment>
    <div className="mainRole">
        <header>
          <p>O clima em {name}</p>
        </header>
        <ul>
            <li><span>País:</span><strong>{sys.country}</strong></li>
            <li><span>Temperatura:</span><strong>{main.temp}ºC</strong></li>
            <li><span>Nuvens:</span><strong>{clouds.all}%</strong></li>
            <li><span>Umidade:</span><strong>{main.humidity}%</strong></li>
            <li><span>Pressão:</span><strong>{main.pressure}hPa</strong></li>
            <li><span>Velocidade do vento:</span><strong>{wind.speed}m/s</strong></li>
            <li>{weather.map((res) => res.description)}</li>
        </ul>
    </div>
  </React.Fragment>
  );
}

export default AppCard;