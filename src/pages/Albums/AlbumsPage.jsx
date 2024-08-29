import React from 'react'
import { useAlbum } from '../../hooks/useAlbum'
import { ListAlbum } from '../../components/Albums'
import SpinnerCustom from '../../components/utils/SpinnerCustom'
import './Albums.scss'

export default function AlbumsPage() {
  
  const { data, isLoading, isError } = useAlbum()
  //console.log(data)
  if(isLoading) {
    return <SpinnerCustom />
  }
  if(isError) {
    return <p className=' text-center text-red-500 text-xl font-semibold'>Algo salió mal no se pudo cargar los datos</p>
  }
  
  return (
    <div className='albums-page'>
      <h1>Albumes</h1>
      <ListAlbum albums={data}/>
    </div>
  )
}
