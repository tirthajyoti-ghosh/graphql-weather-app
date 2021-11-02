export function getDirectionFromAngle(angle) { // https://stackoverflow.com/a/48750814/11686135
    const degree = angle % 360;
    const directions = ['North', 'North-West', 'West', 'South-West', 'South', 'South-East', 'East', 'North-East'];
    const index = Math.round((degree < 0 ? degree + 360 : degree) / 45) % 8;

    return directions[index];
}

export function getParsedWeatherData(data) {
    const {
        weather: {
            temperature: {
                actual: tempActual,
                feelsLike: tempFeelsLike,
                min: tempMin,
                max: tempMax,
            },
            summary: {
                icon: openWeatherIcon,
                title: weatherTitle,
                description: weatherDesc,
            },
            wind: {
                speed: windSpeed,
                deg: windAngle,
            },
            clouds: {
                all: cloudiness,
                visibility,
                humidity,
            },
        },
        name: cityName,
        country,

    } = data;

    return {
        tempActual: Math.round(tempActual - 273.15),
        tempFeelsLike: Math.round(tempFeelsLike - 273.15),
        tempMin: Math.round(tempMin - 273.15),
        tempMax: Math.round(tempMax - 273.15),
        windDirection: getDirectionFromAngle(windAngle),
        visibility: visibility / 1000,
        openWeatherIcon,
        weatherTitle,
        weatherDesc,
        cloudiness,
        windSpeed,
        humidity,
        cityName,
        country,
    };
}
