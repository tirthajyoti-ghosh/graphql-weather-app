/* eslint-disable import/prefer-default-export */
export function getDirectionFromAngle(angle) {
    const degree = angle % 360;
    const directions = ['North', 'North-West', 'West', 'South-West', 'South', 'South-East', 'East', 'North-East'];
    const index = Math.round((degree < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
}
