import React, { useEffect, useState } from 'react'
import './Main.css'
import { Outlet } from 'react-router-dom'

function Main() {
    
    return (
        <div className='main'>
            <Outlet/>
        </div>
        )
}

export default Main
