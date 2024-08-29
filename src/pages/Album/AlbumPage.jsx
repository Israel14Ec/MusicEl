import React, {useState, useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Album, Song } from '../../api'
import { AlbumInfo } from '../../components/Albums'
import { ListSongs } from '../../components/Song'
import SpinnerCustom from '../../components/utils/SpinnerCustom'
import './Album.scss'

const albumController = new Album()
const songController = new Song()

export default function AlbumPage() {

  const {id} = useParams()
  const [songs, setSongs] = useState([])
  const [loadSong, setLoadSong] = useState(false)

  const {data, isLoading, isError } = useQuery({
    queryKey: ['album', id],
    queryFn: () => albumController.getAlbum(id),
    retry: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    (async () => {
      try {
        setLoadSong(true)
        const response = await songController.obtainAllByAlbum(id)
        setSongs(response)
      
      } catch (error) {
        console.error(error)
      } finally {
        setLoadSong(false)
      }
    })()
  }, [id])

  if(isLoading) {
    return <SpinnerCustom/>
  }

  if(isError) {
    return (
      <p className=' text-center text-red-500'>Algo salió mal no se pudo obtener los datos</p>
    )
  }
  
  return (
    
    <div className='album-page'>
      <AlbumInfo album={data}/>
      <ListSongs songs={songs} miniature={data.image} loadSong={loadSong}/>
    </div>
  )
}
