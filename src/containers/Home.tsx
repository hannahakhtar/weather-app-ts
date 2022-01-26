import React, { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import Button from '../components/Button'

const Home = () => {
    const { username, setUsername } = useContext(UserContext)

    const [typed, setTyped] = useState('')


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setUsername(typed)
    }

    return <>
    <h1>{username}</h1>
    <div className="section">
            <form onSubmit={e => handleSubmit(e)}>
                <div className="control">
                    <input className="input is-rounded" type="text" placeholder="Enter your name here.." onChange={e => setTyped(e.target.value)} />
                    <Button className="button" type="submit" buttonText="Enter name!" />
                </div>
            </form>
        </div>
    </>
}

export default Home