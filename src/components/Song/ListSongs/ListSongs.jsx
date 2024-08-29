import React from 'react'
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import SpinnerCustom from '../../../components/utils/SpinnerCustom'
import { usePlayer } from '../../../hooks/usePlayer'
import './ListSongs.scss'

export function ListSongs({songs, miniature, loadSong}) {
  
  const { playSong } = usePlayer()

  const onPlay = (item) => {
    playSong(item, miniature)
  }

  if(loadSong) {
    return (
      <SpinnerCustom/>
    )
  }
  if(songs.length === 0) {
    return(
      <p className='no-songs'>Este albúm no tiene canciones, agregue algunas</p>
    )
    
  }

  return (
    <div>
      <TableContainer>
        <Table className='list-songs'>
          <Thead>
            <Tr>
              <Th> <p className=' text-lg font-bold'>Título</p> </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              songs.map((song) => (
                <Tr key={song.id} onClick={() => onPlay(song)}>
          
                  <Td>
                    <PlayCircleIcon className='w-5'/> 
                    <p>{song.name} </p>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
