import React from 'react'
import './Sidebar.css'
import { Home, Library } from '../index'
function Sidebar() {
    return (
        <div className='sidebar'>
            <Home />
            <Library />
        </div>
    )
}

export default Sidebar
