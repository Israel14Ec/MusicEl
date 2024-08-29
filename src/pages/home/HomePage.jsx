import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Artist, Album, Song } from '../../api'
import { Slider } from '../../components/Shared'
import { bannerHome } from '../../assets'
import './home.scss'
import SpinnerCustom from '../../components/utils/SpinnerCustom'

const artistController = new Artist()
const albumController = new Album()
const songController = new Song()

export default function HomePage() {

  const [songs, setSongs] = useState([])
  const [ loadingSongs, setLoadingSongs] = useState(false)
 

  const {data: artistData, isLoading: isLoadingArtist, isError: isErrorArtist} = useQuery({
    queryKey: ['lastArtist'],
    queryFn: () => artistController.getLastArtist(), 
    retry: false,
    refetchOnWindowFocus: false
  })

  const { data: albumData, isLoading: isLoadingAlbum, isError: isErrorAlbum} = useQuery({
    queryKey: ['lastAlbum'],
    queryFn: () => albumController.getLastAlbum(),
    retry: false, 
    refetchOnWindowFocus: false
  })

  const { data: songData, isLoading: isLoadingSong, isError: isErrorSong } = useQuery({
    queryKey: ['lastSong'],
    queryFn: async () => songController.getLastSongs(),
    retry: false,
    refetchOnWindowFocus: false

  })

  useEffect( () => {
    if(!isErrorSong && !isLoadingSong) {
      (async () => {
        try {
          setLoadingSongs(true)
          let data = []
          for await (const item of songData) {
            const song = item
            const resultAlbum = await albumController.getAlbum(item.album) //Busca el album
            song.image = resultAlbum.image //Guarda la imagen del Album
            data.push(song)
          }
        setSongs(data)
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingSongs(false)
        }
      })()
    } 
  }, [isLoadingSong])

  return (
    <div className='home-page'>
      <div className='home-page__banner'
        style={{ backgroundImage: `url(${bannerHome})`}}
      />

      <div className='home-page__slider'>
        <h2>Últimos artistas</h2>
        {
          isLoadingArtist? (
            <SpinnerCustom/>
          ) :
          (
            artistData && <Slider data={artistData} basePath={`artists`} />
          )
        }
      </div>

      <div className='home-page__slider'>
        {
          isLoadingAlbum ? 
          (
            <SpinnerCustom />
          )
          :
          (
            albumData && <Slider data={albumData} basePath={'albums'}/>
          )
        }
      </div>

      <div className='home-page__slider'>
        <h2>Últimas canciones</h2>
        {
          isLoadingSong || loadingSongs ?
          (
            <SpinnerCustom />
          )
          :
          (
            songs && <Slider data={songs} song={true}/>
          )
        }
      </div>
    </div>
    
  )
}
