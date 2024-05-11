import React from 'react'
import './Sidebar.css'
import {Home, Library} from '../index'
// import logo from '../../assets/logo.svg'
function Sidebar() {
    return (
        <div className='sidebar'>
            <Home/>
            <Library/>
        </div>
    )
}

export default Sidebar
