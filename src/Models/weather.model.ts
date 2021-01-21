export interface DataLocation {
    name: string;
    weather: WeatherModel[];
    main: MainModel;
    wind: WindModel;
    clouds: {
        all: number
    };
    sys: SysModel;
}

interface WeatherModel {
    description: string;
    main: string
}

interface MainModel {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface WindModel {
    speed: number;
    deg: number;
}

interface SysModel {
    country: string;
    sunrise: number;
    sunset: number;
}