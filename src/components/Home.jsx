/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLazyQuery } from '@apollo/client';

import { GET_WEATHER_QUERY } from '../graphql/queries';

const Home = () => {
    const [city, setCity] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');

    const [getWeather, { loading, data, error }] = useLazyQuery(GET_WEATHER_QUERY);

    // Get weather image ONLY when `data` changes.
    useEffect(() => {
        async function fetchBackgroundImage() {
            // Since passing a dependency array will cause the function to run on mount, this if condition prevents that. As `data` is undefined on mount.
            if (data && data.getCityByName) {
                const { data: images } = await axios.get(`https://utility-endpoints.netlify.app/.netlify/functions/unsplash-image-search?orientation=landscape&query=${data.getCityByName.name} ${data.getCityByName.weather.summary.description} weather`);

                setBackgroundImage(images.results[Math.floor(Math.random() * images.results.length)].urls.full);
            }
        }

        fetchBackgroundImage();
    }, [data]);

    if (error) {
        return <h1>Error found</h1>;
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (data && data.getCityByName) {
        return (
            <div
                className="container"
                style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                <div className="primary-info">
                    <div className="align-center">
                        <div>
                            <h1 className="temp-actual">
                                {Math.round(data.getCityByName.weather.temperature.actual - 273)}
                                °C
                            </h1>
                            <small className="temp-feelsLike">
                                Feels like:
                                {' '}
                                {Math.round(data.getCityByName.weather.temperature.feelsLike - 273)}
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
                                {Math.round(data.getCityByName.weather.temperature.min - 273)}
                                °C, Max:
                                {' '}
                                {Math.round(data.getCityByName.weather.temperature.max - 273)}
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
                        <div className="input">
                            <input type="text" placeholder="Search by city" value={city} onChange={(event) => setCity(event.target.value)} />
                            <span />
                        </div>
                        <button
                            style={{ background: '#233243' }}
                            type="button"
                            onClick={() => getWeather({ variables: { name: city } })}
                        >
                            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z" /></svg>
                        </button>
                    </div>

                    <div className="weather-details">
                        <h3>Weather Details</h3>

                        <p>
                            Wind speed
                            <span>{data.getCityByName.weather.wind.speed}</span>
                        </p>
                        <p>
                            Direction
                            <span>{data.getCityByName.weather.wind.deg}</span>
                        </p>
                        <p>
                            Cloudiness
                            <span>{data.getCityByName.weather.clouds.all}</span>
                        </p>
                        <p>
                            Visibility
                            <span>{data.getCityByName.weather.clouds.visibility}</span>
                        </p>
                        <p>
                            Humidity
                            <span>{data.getCityByName.weather.clouds.humidity}</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="search">
            <h1>Search for weather by city</h1>
            <input type="text" placeholder="Search by city" value={city} onChange={(event) => setCity(event.target.value)} />
            <button
                type="button"
                onClick={() => getWeather({ variables: { name: city } })}
            >
                Search
            </button>
        </div>
    );
};

export default Home;
