import React from 'react';
import invert from 'invert-color';
import PropTypes from 'prop-types';

import Search from '../Search';
import { getParsedWeatherData } from '../../utilities/general';

const Secondary = ({
    color, city, setCity, setIsLoading, getWeather, data,
}) => {
    const dataInvertedColor = invert(color || '#000', { black: '#000', white: '#fff' });
    const styles = {
        heading: { color: dataInvertedColor },
        text: { color: invert(color || '#000', { black: '#8A9796', white: '#eaf2f5de' }) },
        data: { color: dataInvertedColor },
    };

    const {
        windSpeed,
        windDirection,
        cloudiness,
        visibility,
        humidity,
    } = getParsedWeatherData(data);

    return (
        <div className="secondary-info">
            <Search
                isHome
                color={color}
                city={city}
                setCity={setCity}
                setIsLoading={setIsLoading}
                getWeather={getWeather}
            />

            <div className="weather-details">
                <h3 style={styles.heading}>Weather Details</h3>

                <hr />

                <h4 style={styles.heading}>Wind</h4>
                <p style={styles.text}>
                    Speed
                    <span style={styles.data}>
                        {windSpeed}
                        {' '}
                        m/s
                    </span>
                </p>
                <p style={styles.text}>
                    Direction
                    <span style={styles.data}>{windDirection}</span>
                </p>

                <hr />

                <h4 style={styles.heading}>Clouds</h4>
                <p style={styles.text}>
                    Cloudiness
                    <span style={styles.data}>
                        {cloudiness}
                        %
                    </span>
                </p>
                <p style={styles.text}>
                    Visibility
                    <span style={styles.data}>
                        {visibility}
                        {' '}
                        km
                    </span>
                </p>
                <p style={styles.text}>
                    Humidity
                    <span style={styles.data}>
                        {humidity}
                        %
                    </span>
                </p>
            </div>
        </div>
    );
};

Secondary.defaultProps = {
    color: null,
};

Secondary.propTypes = {
    color: PropTypes.string,
    city: PropTypes.string.isRequired,
    setCity: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    getWeather: PropTypes.func.isRequired,
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

export default Secondary;
