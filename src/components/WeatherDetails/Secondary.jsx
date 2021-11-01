import React from 'react';
import invert from 'invert-color';

import Search from '../Search';
import { getParsedWeatherData } from '../../utilities/general';

const Secondary = ({
    // eslint-disable-next-line react/prop-types
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

export default Secondary;
