/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLazyQuery } from '@apollo/client';
import useColorThief from 'use-color-thief';

import { GET_WEATHER_QUERY } from '../graphql/queries';
import Loader from './Loader';
import Search from './Search';
import Primary from './WeatherDetails/Primary';
import Secondary from './WeatherDetails/Secondary';

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

                    {/* Primary weather info (left side) */}
                    <Primary data={data.getCityByName} />

                    {/* Secondary weather info (right side) */}
                    <Secondary
                        color={color}
                        city={city}
                        setCity={setCity}
                        setIsLoading={setIsLoading}
                        getWeather={getWeather}
                        data={data.getCityByName}
                    />
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
