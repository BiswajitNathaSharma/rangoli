import React from 'react'
import './Home.css'
import {home, search} from "../../assets/index"
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div className='home'>
            <Link to={'/'} className="logo no-decoration">LOGO</Link>
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
