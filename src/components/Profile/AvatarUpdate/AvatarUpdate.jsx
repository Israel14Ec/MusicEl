import React, { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Storage, User } from '../../../api'
import { defaultUser } from '../../../assets'
import { useDropzone } from 'react-dropzone'
import './AvatarUpdate.scss'
import { toast } from 'react-toastify'

const storageController = new Storage()
const userController = new User()

export function AvatarUpdate( {userData}) {

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: userController.updateAvatarUser,
    onError: (error) => {
      console.log(error)
      toast.error('No se pudo actualizar la foto de perfil')
    },
    onSuccess: () => {
      toast.success('Se actualizo la foto de perfil')
      queryClient.invalidateQueries({queryKey: ['user']}) //Invalido el query
    }
  
  })

    const [avatarURL, setAvatarURL ] = useState(userData.photoURL || defaultUser)
    //Habilita ek drop para arrastar y soltar una imagen
    const onDrop = useCallback(async acceptedFile => {
        const file = acceptedFile[0] //Obtiene la posición 0 del array
        setAvatarURL(URL.createObjectURL(file)) //Convierte el file de la imagen en URl

        const response = await storageController.uploadFile(file, "avatar", userData.uid)
        const url = await storageController.getURLFile(response.metadata.fullPath)
        mutate(url) //Llama a la mutación   
    })

    const { getRootProps, getInputProps } = useDropzone({onDrop})


  return (
    <div className='avatar-update' {...getRootProps()}>
        <input {...getInputProps()} />
        <img src={avatarURL}  />
    </div>
  )
}
