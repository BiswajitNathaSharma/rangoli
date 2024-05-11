import React from 'react'
import './Library.css'
import { library, list, plus, search } from '../../assets'

function Library() {
    return (
        <div className='library'>
            <div className="first-child">
                    <img src={library} alt="Library" />
                    <span>Your Library</span>
                    <img src={plus} alt="add" />
            </div>

            <div className="second-child">
                <button className='button'>Playlists</button>
                <button className='button'>Artists</button>
            </div>

            <div className="third-child">
                <img src={search} alt="" />
                <div>
                    <span>Recents</span>
                    <img src={list} alt="" />
                </div>
            </div>

            <div className="fourth-child">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, eos?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, qui autem ullam quis quisquam delectus ab maiores dicta, est magni minus laudantium, commodi necessitatibus earum? Iure, atque. Saepe nobis inventore, accusantium repudiandae officiis esse totam commodi ullam dolorem ex veritatis hic a laborum itaque nesciunt voluptates voluptatem minima aliquid qui non possimus tempora incidunt! Obcaecati nesciunt ad eos eius vero, laboriosam dicta autem, ipsum maiores velit beatae sapiente quod aspernatur quam, ullam iusto perspiciatis quibusdam ducimus officia. Delectus a accusantium ex laudantium? Sequi, dolore. Doloremque recusandae facere necessitatibus aliquam maxime sequi minus sunt suscipit quam, est perferendis cupiditate molestiae similique!</p>
            </div>
        </div>
    )
}

export default Library
