import React from 'react'
import './Home.css'
import {home, search} from "../../assets/index"
function Home() {
    return (
        <div className='home'>
            <div className="logo">LOGO</div>
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
