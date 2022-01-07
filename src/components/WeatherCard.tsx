import React from "react";

type Props = {
    src: string,
    alt: string,
    date: string,
    degreesC: number,
    degreesF: number,
    feelsLikeDegreesC: number,
    feelsLikeDegreesF: number
}

const WeatherCard: React.FC<Props> = ({ src, alt, date, degreesC, degreesF, feelsLikeDegreesC, feelsLikeDegreesF }) => {
    return <>
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={src} alt={alt} />
                </figure>
            </div>
            <div className="card-content">
                <p>{date}</p>
                <p>Temperature: {degreesC} Celsuis / {degreesF} Fahrenheit</p>
                <p>Feels like: {feelsLikeDegreesC} Celsuis / {feelsLikeDegreesF} Fahrenheit</p>
            </div>
        </div>
    </>
}

export default WeatherCard