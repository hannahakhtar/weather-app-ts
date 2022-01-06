import React, { useState } from "react";

const Home = () => {

    const [typed, setTyped] = useState('')

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(typed)
    }

    return <>
        <div>
            <h1>Home</h1>
        </div>
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="control">
                    <input className="input is-rounded" type="text" onChange={e => setTyped(e.target.value)} />
                    <button className="button" type="submit">See weather!</button>
                </div>
            </form>
        </div>
    </>
}

export default Home