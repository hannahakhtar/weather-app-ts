import React, { useState } from "react";
import axios from "axios";

import Button from '../components/Button'

const API_KEY = process.env.REACT_APP_API_KEY;

const Home: React.FC = () => {

    const [typed, setTyped] = useState('')
    const [cityData, setCityData] = useState<AxiosResponse>()

    interface AxiosResponse {
        location: object,
        current: object,
        forecast?: object
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const searchCapitalised = typed.charAt(0).toUpperCase() + typed.slice(1)
        const response = await axios.get<AxiosResponse>(`https:api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchCapitalised}&days=5&aqi=no&alerts=no`)
        if (Object.keys(response).length === 0) {
            console.log('no results')
            // logic to display 'no results' text 
        } else {
            setCityData(response.data)
        }
    }

    return <>
        <div>
            <h1>Home</h1>
        </div>
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="control">
                    <input className="input is-rounded" type="text" onChange={e => setTyped(e.target.value)} />
                    <Button className="button" type="submit" buttonText="See weather!" placeholder="Search here.."/>
                </div>
            </form>
        </div>
        <div>

        </div>
    </>
}

export default Home