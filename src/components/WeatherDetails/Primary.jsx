import React from 'react';
import PropTypes from 'prop-types';

import { getParsedWeatherData } from '../../utilities/general';

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

Primary.propTypes = {
    data: PropTypes.shape({
        weather: PropTypes.shape({
            temperature: PropTypes.shape({
                actual: PropTypes.number,
                feelsLike: PropTypes.number,
                min: PropTypes.number,
                max: PropTypes.number,
            }),
            summary: PropTypes.shape({
                icon: PropTypes.string,
                title: PropTypes.string,
                description: PropTypes.string,
            }),
            wind: PropTypes.shape({
                speed: PropTypes.number,
                deg: PropTypes.number,
            }),
            clouds: PropTypes.shape({
                all: PropTypes.number,
                visibility: PropTypes.number,
                humidity: PropTypes.number,
            }),
        }),
        name: PropTypes.string,
        country: PropTypes.string,
    }).isRequired,
};

export default Primary;
