import React, { useContext, useState } from "react";
import axios from "axios";

import { UserContext } from "../context/UserContext";

import Button from '../components/Button'
import Card from '../components/WeatherCard'

const API_KEY = process.env.REACT_APP_API_KEY;

const Search: React.FC = () => {

    
    const user = useContext(UserContext)
    // const [username, setUsername] = useState
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
            avgtemp_c: number,
            avgtemp_f: number,
            feelslike_c: number,
            feelslike_f: number
        }
    }

    interface AxiosResponse {
        location: {
            name: string,
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
        setShowFiveDay(false)
        setFiveDayButtonText("Show two day forecast")
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
                <h1 className="h1">{user.username}</h1>
            </div>
            <div className="section">
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="control">
                        <input className="input is-rounded" type="text" placeholder="Search here.." onChange={e => setTyped(e.target.value)} />
                        <Button className="button" type="submit" buttonText="See weather!" />
                    </div>
                </form>
            </div>
            <div className="currentWeather section">
                <div className="column is-half">
                    {cityData &&
                        <Card src={cityData.current.condition.icon} alt={cityData.current.condition.text} name={cityData.location.name} date={cityData.location.localtime} degreesC={cityData.current.temp_c} degreesF={cityData.current.temp_f} feelsLikeDegreesC={cityData.current.feelslike_c} feelsLikeDegreesF={cityData.current.feelslike_f} />
                    }
                </div>
                {cityData &&
                    <Button className="button" type="submit" buttonText={fiveDayButtonText} onClick={handleFiveDayForecastClick} />
                }
                {error &&
                    <p>No city matching your search. Please try again.</p>
                }
            </div>
            {showFiveDay && cityData &&
                <div className="fiveDayForecast section">
                    <div className="column is-half" >
                        {forecast?.map((day: Forecast) => {
                            console.log(day)
                            return <>
                                {/* no 'feels like in forecast - investigate further */}
                                <Card src={day.day.condition.icon} alt={day.day.condition.text} name={cityData.location.name} date={day.date} degreesC={day.day.avgtemp_c} degreesF={day.day.avgtemp_f} feelsLikeDegreesC={day.day.feelslike_c} feelsLikeDegreesF={day.day.feelslike_f} />
                            </>
                        })
                        }
                    </div>
                </div>
            }
    </>
}

export default Search