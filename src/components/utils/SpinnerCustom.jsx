import React from 'react'
import { Spinner } from '@chakra-ui/react'

export default function SpinnerCustom() {
  return (
    <div className=' flex flex-col justify-center items-center'>
        <Spinner size='lg' />
        <p>Cargando ...</p>
    </div>
  )
}
