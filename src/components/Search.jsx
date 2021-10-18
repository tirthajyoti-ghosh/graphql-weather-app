import React from 'react';

const Search = ({
    // eslint-disable-next-line react/prop-types
    city, setCity, setIsLoading, getWeather,
}) => {
    function fetchData(event) {
        event.preventDefault();

        getWeather({ variables: { name: city } });
        setIsLoading(true);
    }

    return (
        <div className="search initial">
            <a href="/" className="logo">the.weather</a>
            <form onSubmit={fetchData}>
                <div className="input-cont single">
                    <input type="text" placeholder="Search by city" value={city} onChange={(event) => setCity(event.target.value)} />
                    <span />
                </div>
                <button type="submit" style={{ display: 'none' }}>Search</button>
            </form>
        </div>
    );
};

export default Search;
