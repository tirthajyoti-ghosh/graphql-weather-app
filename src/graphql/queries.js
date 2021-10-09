import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_WEATHER_QUERY = gql`
    query getCityByName($name: String!) {
        getCityByName(name: $name) {
            name
            country
            weather {
                summary {
                    title
                    icon
                }
                temperature {
                    actual
                    feelsLike
                    min
                    max
                }
                wind {
                    speed
                    deg
                }
                clouds {
                    all
                    visibility
                    humidity
                }
            }
        }
    }
`;
