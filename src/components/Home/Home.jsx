import React, { useState } from 'react'
import './Home.css'
import { forward, backward, home, search } from "../../assets/index"
import { Link, useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()

    const [input, setInput] = useState("")
    const [focused, setFocused] = useState(false)
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const query = event.target.value;
            setInput("")
            navigate(`/search/${query}`);
        }
    };
    return (
        <div className='home'>
            <div className="logo-withNavigate">
                <Link to={'/'} className="logo no-decoration">SHRUTI</Link>
                <div className="navigation">
                    <img src={backward} alt="" onClick={() => navigate(-1)} />
                    <img src={forward} alt="" onClick={() => navigate(1)} />
                </div>
            </div>
            <Link to={'/'} className='child1 no-decoration'>
                <img src={home} alt="" />
                <span>Home</span>
            </Link>
            <div className={`child2 ${focused ? `slided-input` : ""}`}>
                <img 
                    src={search} 
                    alt="" 
                    className={focused ? 'slide' : ''} 
                    onClick={handleKeyDown}/>
                <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    placeholder="Search" 
                    onChange={(e)=> setInput(e.target.value)}
                    value={input}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    />
            </div>
        </div>
    )
}

export default Home
