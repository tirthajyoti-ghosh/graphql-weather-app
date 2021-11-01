import React from 'react';
import invert from 'invert-color';

const Search = ({
    // eslint-disable-next-line react/prop-types
    city, setCity, setIsLoading, getWeather, isHome, color,
}) => {
    function fetchData(event) {
        event.preventDefault();

        getWeather({ variables: { name: city } });
        setIsLoading(true);
    }

    if (isHome) {
        return (
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
        );
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
