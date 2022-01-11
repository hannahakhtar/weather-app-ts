import React, { useState } from "react";
import axios from "axios";

import Button from '../components/Button'
import Card from '../components/WeatherCard'

const API_KEY = process.env.REACT_APP_API_KEY;

const Home: React.FC = () => {

    const [typed, setTyped] = useState('')
    const [error, setError] = useState(false)
    const [cityData, setCityData] = useState<AxiosResponse>()
    const [forecast, setForecast] = useState<Forecast[]>()
    const [showFiveDay, setShowFiveDay] = useState(false)
    const [fiveDayButtonText, setFiveDayButtonText] = useState("Show two day forecast")


    type Forecast = {
        date: string,
        day: {
            condition: {
                text: string,
                icon: string
            },
            temp_c: number,
            temp_f: number,
            feelslike_c: number,
            feelslike_f: number
        }
    }

    interface AxiosResponse {
        location: {
            localtime: string
        },
        current: {
            condition: {
                text: string,
                icon: string
            },
            temp_c: number,
            temp_f: number,
            feelslike_c: number,
            feelslike_f: number
        },
        forecast: {
            forecastday: Forecast[]
        }
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        setError(false)
        e.preventDefault()
        const searchCapitalised = typed.charAt(0).toUpperCase() + typed.slice(1)
        axios.get<AxiosResponse>(`https:api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchCapitalised}&days=6&aqi=no&alerts=no`)
            .then(({ data }) => {
                setCityData(data)
                setForecast(data.forecast.forecastday)
            })
            .catch((error) => {
                if (error.response) {
                    console.log('data', error.response.data);
                    console.log('status', error.response.status);
                    console.log('headers', error.response.headers);
                    setError(true)
                }
            })
    }

    const handleFiveDayForecastClick = () => {
        if (showFiveDay) {
            setFiveDayButtonText("Show two day forecast")
            setShowFiveDay(false)
        } else {
            setFiveDayButtonText("Hide two day forecast")
            setShowFiveDay(true)
        }
    }

    return <>
        <div>
            <h1>Home</h1>
        </div>
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="control">
                    <input className="input is-rounded" type="text" placeholder="Search here.." onChange={e => setTyped(e.target.value)} />
                    <Button className="button" type="submit" buttonText="See weather!" />
                </div>
            </form>
        </div>
        <div className="currentWeather">
            {cityData &&
                <Card src={cityData.current.condition.icon} alt={cityData.current.condition.text} date={cityData.location.localtime} degreesC={cityData.current.temp_c} degreesF={cityData.current.temp_f} feelsLikeDegreesC={cityData.current.feelslike_c} feelsLikeDegreesF={cityData.current.feelslike_f} />
            }
            {cityData &&
                <Button className="button" type="submit" buttonText={fiveDayButtonText} onClick={handleFiveDayForecastClick} />
            }
            {error &&
                <p>No city matching your search. Please try again.</p>
            }
        </div>
        {showFiveDay &&
            <div className="fiveDayForecast">
                {forecast.map((day: Forecast) => {
                    console.log(day)
                })
                }
            </div>
        }
    </>
}

export default Home