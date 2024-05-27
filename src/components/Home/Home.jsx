import React from 'react'
import './Home.css'
import {forward, backward, home, search} from "../../assets/index"
import { Link, useNavigate } from 'react-router-dom'
function Home() {
    const navigte = useNavigate()
    return (
        <div className='home'>
            <div className="logo-withNavigate">
            <Link to={'/'} className="logo no-decoration">SHRUTI</Link>
            <div className="navigation">
                <img src={backward} alt="" onClick={()=>navigte(-1)}/>
                <img src={forward} alt="" onClick={()=>navigte(1)}/>
            </div>
            </div>
            <div className='child1'>
            <img src={home} alt="" />
            <span>Home</span>
            </div>
            <div className='child2'>
            <img src={search} alt="" />
            <span>Search</span>
            </div>
        </div>
    )
}

export default Home
