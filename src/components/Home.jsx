import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/queries';

const Home = () => {
    const [city, setCity] = useState('');

    const [getWeather, { loading, data, error }] = useLazyQuery(GET_WEATHER_QUERY);

    if (error) {
        return <h1>Error found</h1>;
    }

    if (loading) {
        return <h1>Loading....</h1>;
    }

    const countryName = new Intl.DisplayNames(['en'], { type: 'region' });

    return (
        <div className="home">
            <h1>Search for weather by city</h1>
            <input type="text" placeholder="City..." value={city} onChange={(event) => setCity(event.target.value)} />
            <button type="button" onClick={() => getWeather({ variables: { name: city } })}>Search</button>

            {data && data.getCityByName && (
                <>
                    <h3>
                        Name:
                        {' '}
                        {data.getCityByName.name}
                    </h3>
                    <h3>
                        Country:
                        {' '}
                        {countryName.of(data.getCityByName.country)}
                    </h3>
                    <h3>
                        Summary:
                        {' '}
                        {data.getCityByName.weather.summary.title}
                    </h3>
                    <h3>
                        Icon:
                        {' '}
                        <img src={`https://openweathermap.org/img/wn/${data.getCityByName.weather.summary.icon}@2x.png`} alt={data.getCityByName.weather.summary.description} />
                    </h3>
                    <h3>
                        Temperature (actual):
                        {' '}
                        {data.getCityByName.weather.temperature.actual - 273}
                    </h3>
                    <h3>
                        Wind (speed):
                        {' '}
                        {data.getCityByName.weather.wind.speed}
                    </h3>
                    <h3>
                        Clouds (all):
                        {' '}
                        {data.getCityByName.weather.clouds.all}
                    </h3>
                </>
            )}
        </div>
    );
};

export default Home;
