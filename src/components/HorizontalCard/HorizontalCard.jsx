import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { MusicCard } from '../index'
import './HorizontalCard.css'

function HorizontalCard({category}) {
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPosition(e.clientX - containerRef.current.offsetLeft);
        setCurrentTranslate(containerRef.current.scrollLeft);
        containerRef.current.style.cursor = 'grabbing';
    };
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const dragDistance = e.clientX - containerRef.current.offsetLeft - startPosition;
        containerRef.current.scrollLeft = currentTranslate - dragDistance;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        containerRef.current.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        containerRef.current.style.cursor = 'grab';
    };
    const handleWheel = (e) => {
        e.preventDefault();
        containerRef.current.scrollLeft += e.deltaY;
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel);
        }
        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);
    return (
        <>
        <div
                ref={containerRef}
                className="horizontal-card"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}>
                    {category.map((song) => {
                return (
                    
                    <MusicCard
                        key={song.id}
                        id= {song.id}
                        name={song.name}
                        songCount={song.songCount}
                        img={song.image[2].url} 
                    />
                );
            })}
            </div>
        </>
    )
}

export default HorizontalCard
