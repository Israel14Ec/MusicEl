import React from 'react'
import { RangeSlider, RangeSliderFilledTrack, RangeSliderTrack, RangeSliderThumb } from '@chakra-ui/react'
import { SpeakerWaveIcon } from '@heroicons/react/24/outline'
import { Player } from '../../Shared'
import { usePlayer } from '../../../hooks/usePlayer'
import "./Footer.scss"

export function Footer() {

    const { song, miniature, volumen, saveVolumen, playing } = usePlayer()

  return (
    <div className='footer'>
        <div className=' footer__left'>
            { miniature && (
                    <img className={playing && 'rotating-thumbnail'} src={miniature} />
                ) 
            }
            
            { song && (
                <p> {song.name} </p>
            )} 
        </div>
        <div className='footer__center'>
            <Player />
        </div>
          
        <div className='footer__right'>
            <SpeakerWaveIcon className='w-5'/>
            <RangeSlider aria-label={['min', 'max']} defaultValue={[0, volumen]} colorScheme='teal' 
                onChangeEnd={(val) => saveVolumen(val[1])}
            >
                <RangeSliderTrack>
                    <RangeSliderFilledTrack/>
                </RangeSliderTrack>
                <RangeSliderThumb index={1} />
            </RangeSlider>
        </div>
    </div>
  )
}
