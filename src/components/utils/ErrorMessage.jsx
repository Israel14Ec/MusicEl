import React from 'react'
import './ErrorMessage.scss'

export default function ErrorMessage({message}) {
  return (
    <p className='message'> {message} </p>
  )
}
