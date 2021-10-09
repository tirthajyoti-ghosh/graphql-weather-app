import React, { useState } from 'react';

const Home = () => {
    const [city, setCity] = useState('');

    return (
        <div className="home">
            <h1>Search for weather by city</h1>
            <input type="text" value={city} onChange={(event) => setCity(event.target.value)} />
            <button type="button">Search</button>
        </div>
    );
};

export default Home;
