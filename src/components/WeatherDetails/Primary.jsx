import React from 'react';
import { getParsedWeatherData } from '../../utilities/general';

// eslint-disable-next-line react/prop-types
const Primary = ({ data }) => {
    const {
        tempActual,
        tempFeelsLike,
        tempMin,
        tempMax,
        openWeatherIcon,
        weatherDesc,
        weatherTitle,
        cityName,
        country,
    } = getParsedWeatherData(data);

    return (
        <div className="primary-info">
            <div className="align-center">
                <div>
                    <h1 className="temp-actual">
                        {tempActual}
                        °C
                    </h1>
                    <small className="temp-feelsLike">
                        Feels like:
                        {' '}
                        {tempFeelsLike}
                        °C
                    </small>
                </div>
                <div>
                    <h2>
                        {cityName}
                        ,
                        {' '}
                        {country}
                    </h2>
                    <small>
                        Min:
                        {' '}
                        {tempMin}
                        °C / Max:
                        {' '}
                        {tempMax}
                        °C
                    </small>
                </div>
                <div>
                    <img
                        className="weather-img"
                        src={`https://openweathermap.org/img/wn/${openWeatherIcon}@2x.png`}
                        alt={weatherDesc}
                    />
                    <small className="weather-summary">{weatherTitle}</small>
                </div>
            </div>
        </div>
    );
};

export default Primary;
