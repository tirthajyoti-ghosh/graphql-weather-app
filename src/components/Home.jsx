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
                const { data: images } = await axios.get(`https://utility-endpoints.netlify.app/.netlify/functions/unsplash-image-search?orientation=landscape&query=${data.getCityByName.name} ${data.getCityByName.weather.summary.description}`);

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
        const countryName = new Intl.DisplayNames(['en'], { type: 'region' });

        return (
            <div className="container" style={{ background: `url(${backgroundImage})` }}>
                <div className="primary-info">
                    <div>
                        <h1 className="temp-actual">
                            {Math.round(data.getCityByName.weather.temperature.actual - 273)}
                            °
                        </h1>
                        <small>
                            Feels like:
                            {' '}
                            {Math.round(data.getCityByName.weather.temperature.feelsLike - 273)}
                            °
                        </small>
                    </div>
                    <div>
                        <h2>
                            {data.getCityByName.name}
                            ,
                            {' '}
                            {countryName.of(data.getCityByName.country)}
                        </h2>
                        <small>
                            Min:
                            {' '}
                            {data.getCityByName.weather.temperature.min}
                            °, Max:
                            {' '}
                            {data.getCityByName.weather.temperature.max}
                            °
                        </small>
                    </div>
                    <div>
                        <img
                            src={`https://openweathermap.org/img/wn/${data.getCityByName.weather.summary.icon}@2x.png`}
                            alt={data.getCityByName.weather.summary.description}
                        />
                        <small>{data.getCityByName.weather.summary.title}</small>
                    </div>
                </div>

                <div className="secondary-info">
                    <div className="search">
                        <input type="text" placeholder="Search by city" value={city} onChange={(event) => setCity(event.target.value)} />
                        <button
                            type="button"
                            onClick={() => getWeather({ variables: { name: city } })}
                        >
                            Search
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
