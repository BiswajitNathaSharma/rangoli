import React from 'react'
import './Main.css'
import { Outlet } from 'react-router-dom'
import { useLoading } from '../../Context/loadingContext';
import { Loader } from '../';

function Main() {
    const { isLoading } = useLoading();
    return (
        <div className='main'>
            {
                !isLoading ? <></> :
                    <Loader wifi={false} />
            }
            <Outlet />
        </div>
    )
}

export default Main
