/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLazyQuery } from '@apollo/client';
import useColorThief from 'use-color-thief';
import invert from 'invert-color';

import { GET_WEATHER_QUERY } from '../graphql/queries';
import { getDirectionFromAngle } from '../utilities/general';
import Loader from './Loader';
import Search from './Search';

const Home = () => {
    const [city, setCity] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('');

    const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY);

    // Hook to get dominant color of background image
    const { color } = useColorThief(backgroundImage, { format: 'hex' });

    // Get weather image ONLY when `data` changes.
    useEffect(() => {
        async function fetchBackgroundImage() {
            // Since passing a dependency array will cause the function to run on mount, this if condition prevents that. As `data` is undefined on mount.
            if (data && data.getCityByName) {
                const { data: images } = await axios.get(`https://utility-endpoints.netlify.app/.netlify/functions/unsplash-image-search?per_page=1000&orientation=landscape&query=${data.getCityByName.name} ${data.getCityByName.weather.summary.description} weather`);

                setBackgroundImage(images.results[Math.floor(Math.random() * images.results.length)].urls.full);
            }
        }

        fetchBackgroundImage();
    }, [data]);

    // Hide loading spinner ONLY when `color` changes
    // i.e., weather data and background image has loaded and dominant color of the background image has been obtained
    useEffect(() => {
        setIsLoading(false);
    }, [color]);

    if (error) {
        return <h1>Error found</h1>;
    }

    if (isLoading && !data) {
        return <Loader />;
    }

    if (data && data.getCityByName) {
        const dataInvertedColor = invert(color || '#000', { black: '#000', white: '#fff' });
        const styles = {
            heading: { color: dataInvertedColor },
            text: { color: invert(color || '#000', { black: '#8A9796', white: '#eaf2f5de' }) },
            data: { color: dataInvertedColor },
        };

        return (
            <>
                {isLoading ? <Loader /> : ''}
                <div
                    className="container"
                    style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                >
                    <a href="/" className="logo">the.weather</a>
                    <div className="primary-info">
                        <div className="align-center">
                            <div>
                                <h1 className="temp-actual">
                                    {Math.round(data.getCityByName.weather.temperature.actual - 273.15)}
                                    °C
                                </h1>
                                <small className="temp-feelsLike">
                                    Feels like:
                                    {' '}
                                    {Math.round(data.getCityByName.weather.temperature.feelsLike - 273.15)}
                                    °C
                                </small>
                            </div>
                            <div>
                                <h2>
                                    {data.getCityByName.name}
                                    ,
                                    {' '}
                                    {data.getCityByName.country}
                                </h2>
                                <small>
                                    Min:
                                    {' '}
                                    {Math.round(data.getCityByName.weather.temperature.min - 273.15)}
                                    °C / Max:
                                    {' '}
                                    {Math.round(data.getCityByName.weather.temperature.max - 273.15)}
                                    °C
                                </small>
                            </div>
                            <div>
                                <img
                                    className="weather-img"
                                    src={`https://openweathermap.org/img/wn/${data.getCityByName.weather.summary.icon}@2x.png`}
                                    alt={data.getCityByName.weather.summary.description}
                                />
                                <small className="weather-summary">{data.getCityByName.weather.summary.title}</small>
                            </div>
                        </div>
                    </div>

                    <div className="secondary-info">

                        <div className="search">
                            <div className="input-cont">
                                <input style={{ color: invert(color || '#000', { black: '#8A9796', white: '#fff' }) }} type="text" placeholder="Search by city" value={city} onChange={(event) => setCity(event.target.value)} />
                                <span style={{ backgroundColor: invert(color || '#000', { black: '#8A9796', white: '#fff' }) }} />
                            </div>
                            <button
                                style={{ background: color }}
                                type="button"
                                onClick={() => {
                                    getWeather({ variables: { name: city } });
                                    setIsLoading(true);
                                }}
                            >
                                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill={invert(color || '#000')} d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z" /></svg>
                            </button>
                        </div>

                        <div className="weather-details">
                            <h3 style={styles.heading}>Weather Details</h3>

                            <hr />

                            <h4 style={styles.heading}>Wind</h4>
                            <p style={styles.text}>
                                Speed
                                <span style={styles.data}>{data.getCityByName.weather.wind.speed}</span>
                            </p>
                            <p style={styles.text}>
                                Direction
                                <span style={styles.data}>{getDirectionFromAngle(data.getCityByName.weather.wind.deg)}</span>
                            </p>

                            <hr />

                            <h4 style={styles.heading}>Clouds</h4>
                            <p style={styles.text}>
                                Cloudiness
                                <span style={styles.data}>{data.getCityByName.weather.clouds.all}</span>
                            </p>
                            <p style={styles.text}>
                                Visibility
                                <span style={styles.data}>{data.getCityByName.weather.clouds.visibility}</span>
                            </p>
                            <p style={styles.text}>
                                Humidity
                                <span style={styles.data}>{data.getCityByName.weather.clouds.humidity}</span>
                            </p>
                        </div>

                    </div>
                </div>
            </>
        );
    }

    return (
        <Search
            city={city}
            setCity={setCity}
            setIsLoading={setIsLoading}
            getWeather={getWeather}
        />
    );
};

export default Home;
