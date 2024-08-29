import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Artist } from '../../../api'
import './AlbumInfo.scss'

const artistController = new Artist()

export function AlbumInfo({album}) {

    const [ artistData, setArtistData ] = useState(null)


    useEffect( () => {

        //Función flecha anonima autoejecutable
        ( async () => {
            try {
                const response = await artistController.getArtist(album.artist)
                setArtistData(response)

            } catch (error) {
                console.error(error)
            }
        })()
    }, [album])

  return (
    <div className='album-info'>
        <img src={album.image} alt={album.name} />
        <div>
            <h1> {album.name} </h1>
            {artistData && (
                <p>De: <Link className='album-info__link' to={`/artists/${artistData.id}`}>{artistData.name}</Link> </p>
            )}
        </div>
    </div>
  )
}
