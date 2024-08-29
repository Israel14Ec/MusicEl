import React from 'react'
import { useArtist } from '../../hooks/useArtist'
import { ListArtist } from '../../components/artist'
import './Artists.scss'


export default function ArtistsPage() {

  const { data, isLoading, isError } = useArtist()

  return (
    <div className='artists-page'>
      <h1>Artistas</h1>

        <ListArtist artists={data} isLoading={isLoading} isError={isError}/>
    
    </div>
  )
}
