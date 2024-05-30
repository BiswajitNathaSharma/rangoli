import React from 'react'
import "./History.css"
import { useSelector } from 'react-redux'
import { HorizontalCard } from '..'
function History() {
    const history = useSelector(State => State.songs.historySong)
    return (
        <div className='history'>
            <HorizontalCard category={history} history={true} />
        </div>
    )
}

export default History
