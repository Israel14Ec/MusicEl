import React, {useState, useEffect, useRef} from 'react'
import { usePlayer } from '../../../hooks/usePlayer'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import Slick from "react-slick"
import { Link } from 'react-router-dom'
import './Slider.scss'

export function Slider({data, basePath, song}) {

    const [size, setSize] = useState(0)
    const [loadCompleted, setLoadCompleted] = useState(false)
    const itemRef = useRef()
    const { playSong } = usePlayer()
    
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        swipeToSlide: true,
        centerMode: true, 
        adaptiveHeight: true //Adapta la altua (hace que se repita si tiene pocas canciones)
    }

    useEffect(() => {
        if(itemRef.current) {
            setSize(itemRef.current.clientWidth);
            
        }
    }, [loadCompleted])
    

  return (
    <Slick {...settings} className='slider'>
        {
            data.map( ( item) => {
                //si el item llega como cación
                if(song) {
                    return (
                        <div key={item.id} 
                            className='slider__item' 
                            ref={itemRef}    
                            onLoad={ () => setLoadCompleted(true) }
                            onClick={() => playSong(item, item.image)}
                        >
                            <div className='slider__item-block-play'>
                                <img src={item.image} alt={item.name}  style={{ height: size}}/>
                                <div className='slider__item-block-play__icon'>
                                    <PlayCircleIcon />
                                </div>
                            </div>
                            <h3> { item.name } </h3>
                        </div>
                    )
                }

                //no es canción
                return (
                    <Link 
                        to={`/${basePath}/${item.id}`} 
                        key={item.id} 
                        className='slider__item'
                        onLoad={ () => setLoadCompleted(true) }
                        ref={itemRef}      
                    >
                        <img src={item.image} alt={item.name} style={{ height: size}} />
                        <h3> { item.name } </h3>
                    </Link>
                )   
            }) 
        }
    </Slick>
  )
}

