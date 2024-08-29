import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Artist,Album, Song } from '../../api'
import { ArtistBanner } from '../../components/artist'
import { Spinner } from '@chakra-ui/react'
import { Slider } from '../../components/Shared'
import './Artist.scss'

const artistController = new Artist()
const albumController = new Album()
const songController = new Song()

export default function ArtistPage() {
  const {id} = useParams()

  const [albums, setAlbums] = useState(null)
  const [songs, setSongs] = useState(null)

  const {data, isLoading, isError} = useQuery({
    queryKey: ['artist', id],
    queryFn: () => artistController.getArtist(id),
    retry: false,
    refetchOnWindowFocus: false
  })

  useEffect( () => {
    //Funcion anonima autoejecutable
    (async () => {
      try {
        const response = await albumController.getAlbumsByArtist(id)
        setAlbums(response)
        
      } catch (error) {
        console.error(error)
      }
    })()
  }, [id])

  useEffect( () => {
    if(albums) {
      (async () => {
        try {
          let data = []
          for await (const item of albums) {
            const result = await songController.obtainAllByAlbum(item.id)
            
            const dataTemp = result.map(dataSong => {
              return {
                ...dataSong, //Contenido del objeto
                image: item.image //Foto del album
              }
            })
            data.push(...dataTemp)
          }
          setSongs(data)

        } catch (error) {
          console.error(error)
        }
      })()
    }
  }, [albums])

  if(isLoading) {
    return (
      <div className='flex flex-col justify-center items-center gap-3'>
        <Spinner size="lg" />
        <p>Cargando</p>
      </div>
    )
  }

  if(isError) {
    return (
      <p className=' text-center text-red-500'>Algo salió mal no se pudo obtener los datos</p>
    )
  }

  return (
    <div className='artist-page'>
      <ArtistBanner image={data.image} name={data.name}/>
      <div className='artist-page__slider'>
        <h2>Albumes</h2>
        {
          albums && (
            <Slider data={albums} basePath={'albums'}/>
          )
        }
      </div>

      <div className='artist-page__slider'>
        <h2>Canciones</h2>
        {
          songs && (
            <Slider data={songs} song={true}/>
          )
        }
      </div>
    </div>
  )
}
