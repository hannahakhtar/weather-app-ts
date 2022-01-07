import React, { useState } from "react";
import axios from "axios";

import Button from '../components/Button'
import Card from '../components/WeatherCard'
const API_KEY = process.env.REACT_APP_API_KEY;

const Home: React.FC = () => {

    const [typed, setTyped] = useState('')
    const [error, setError] = useState(false)
    const [cityData, setCityData] = useState<AxiosResponse>()

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
        forecast?: object
    }

    const handleSubmit = (e: React.SyntheticEvent) => {
        setError(false)
        e.preventDefault()
        const searchCapitalised = typed.charAt(0).toUpperCase() + typed.slice(1)
        axios.get<AxiosResponse>(`https:api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchCapitalised}&days=5&aqi=no&alerts=no`)
            .then(response => setCityData(response.data))
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    // if true, display message saying to search again (use error message in error.response.data.message)
                    setError(true)
                }
            })
    }

    return <>
        <div>
            <h1>Home</h1>
        </div>
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="control">
                    <input className="input is-rounded" type="text" onChange={e => setTyped(e.target.value)} />
                    <Button className="button" type="submit" buttonText="See weather!" placeholder="Search here.." />
                </div>
            </form>
        </div>
        <div className="currentWeather">
            {cityData &&
                <Card src={cityData.current.condition.icon} alt={cityData.current.condition.text} date={cityData.location.localtime} degreesC={cityData.current.temp_c} degreesF={cityData.current.temp_f} feelsLikeDegreesC={cityData.current.feelslike_c} feelsLikeDegreesF={cityData.current.feelslike_f} />
            }
            {error &&
            <p>No city matching your search. Please try again.</p>
            }
        </div>
        <div className="forecast">

        </div>
    </>
}

export default Home