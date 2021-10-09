import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/queries';

const Home = () => {
    const [city, setCity] = useState('');

    const [getWeather, { loading, data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
        variables: {
            name: city,
        },
    });

    if (error) {
        return <h1>Error found</h1>;
    }

    if (loading) {
        return <h1>Loading....</h1>;
    }

    if (data) {
        console.log(data);
        const countryName = new Intl.DisplayNames(['en'], { type: 'region' });
        console.log(countryName.of(data.getCityByName.country));
    }

    return (
        <div className="home">
            <h1>Search for weather by city</h1>
            <input type="text" placeholder="City..." value={city} onChange={(event) => setCity(event.target.value)} />
            <button type="button" onClick={() => getWeather()}>Search</button>
        </div>
    );
};

export default Home;
