import React, { useState } from 'react'
import { PauseCircleIcon, PlayCircleIcon} from '@heroicons/react/24/solid'
import { Progress } from '@chakra-ui/react'
import ReactPlayer from 'react-player'
import { usePlayer } from '../../../hooks/usePlayer'
import "./Player.scss"

export function Player() {

  const { song, playing, pause, resume, volumen } = usePlayer()
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [currentSeconds, setCurrentSeconds] = useState(0)

  const onProgress = (data) => {
    setTotalSeconds(data.loadedSeconds)
    setCurrentSeconds(data.playedSeconds)
  }
  
  return (
    <div className='player'>
      <button onClick={playing ? pause : resume}>
        {
          playing ? (
            <PauseCircleIcon/>
          )
          :
          (
            <PlayCircleIcon/>
          )
            
        }
      </button>

      <Progress 
        max={totalSeconds}
        value={currentSeconds} 
        colorScheme='teal' 
        size='xs'
      />

      <ReactPlayer 
        url={song?.file} 
        playing={playing} 
        height={0} 
        width={0} 
        volume={(volumen)/100}
        onProgress={onProgress}
      />

    </div>
  )
}
