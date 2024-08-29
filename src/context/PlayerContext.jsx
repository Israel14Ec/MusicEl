import React, { useState, createContext } from 'react'

//Contexto
export const PlayerContext = createContext({})

//contenido que tiene el objeto
export function PlayerProvider({children}) {
    
    const [song, setSong ] = useState(null)
    const [miniature, setMiniature] = useState(null)
    const [playing, setPlaying] = useState(false)
    const [volumen, setVolumen] = useState(+localStorage.getItem('volume') || 50)

    //Funciones ----------------

    //Reproducir canción
    const playSong = (songData, miniatureData) => {
        setSong(songData)
        setMiniature(miniatureData)
        setPlaying(true)
    }

    //Funcion para guadar volumen en localStorage
    const saveVolumen = (volume) => {
        setVolumen(volume)
        localStorage.setItem('volume', volume)
    }

    const pause = () => setPlaying(false)
    const resume = () => setPlaying(true)

    //Retornar
    const data = {
        playSong,
        pause,
        resume,
        setVolumen,
        saveVolumen,
        song,
        miniature,
        playing,
        volumen
    }

    return (
        <PlayerContext.Provider value={data}>
            { children }
        </PlayerContext.Provider>
    )
    
}