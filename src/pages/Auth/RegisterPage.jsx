import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { EmailIcon, PhoneIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import { Auth } from '../../api'
import ErrorMessage from '../../components/utils/ErrorMessage'
import { toast } from 'react-toastify'
import './Register.scss'

const auth = new Auth

export default function Register() {
  
  const {register, handleSubmit, formState: {errors} } = useForm()
  const navigate = useNavigate()
  //Estado para mostrar la contraseña
  const [show, setShow] = useState(false)

  const handleShow= () => setShow(!show) 

  //Código de los errores:
  
  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado.'
      case 'auth/invalid-email':
        return 'El correo no es válido.'
      case 'auth/operation-not-allowed':
        return 'La operación no está permitida.'
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.'
      default:
        return 'Ocurrió un error. Por favor, inténtelo de nuevo.'
    }
  }

  //Función que llama el form
  const  handleForm = async ({email, password, userName}) => {
    try {
      await auth.register(email, password, userName )
      toast.success('Se creo la cuenta correctamente')
      navigate('/auth')
    } catch (error) {
      const errorMessage = getErrorMessage(error.code)
      toast.error(errorMessage)
    }
  }

  function getErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'El correo ya está registrado.'
      case 'auth/invalid-email':
        return 'El correo no es válido.'
      case 'auth/operation-not-allowed':
        return 'La operación no está permitida.'
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.'
      default:
        return 'Ocurrió un error. Por favor, inténtelo de nuevo.'
    }
  }

  return (
    <div className='register-form'>
      <h1>Empieza a escuchar tus canciones favoritas</h1>
      <form onSubmit={handleSubmit(handleForm)} noValidate>

        <label htmlFor="email">Email:</label>
        <InputGroup>
          <Input
            id='email'
            type='email'
            placeholder='Ingrese un email'
            {...register('email', {
              required: "El email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no válido",
              }
            })}
          />
          <InputRightElement>
            <EmailIcon/>
          </InputRightElement>
        </InputGroup>

        {errors.email && (
          <ErrorMessage message={errors.email.message}/>
        )}

        <label htmlFor="password">Contraseña:</label>
        <InputGroup>
          <Input 
            id='password'
            type={ show ? 'text' : 'password'}
            placeholder='Ingrese la contraseña'
            autoComplete='on'
            { ...register('password', {
              minLength: {
                value: 8,
                message: 'Ingrese al menos 8 caracteres'
              },
              required: 'Se requiere ingresar una contraseña'
            })}
          />
          <InputRightElement onClick={handleShow}>
            {show ? <ViewIcon/> : <ViewOffIcon/> }
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <ErrorMessage message={errors.password.message}/>
        )}

        <label htmlFor="userName">Nombre:</label>
        <InputGroup>
          <Input 
            id='userName'
            placeholder='Como deberiamos llamarte?'
            type='text'
            { ...register('userName', {
              required: 'El nombre es obligatorio'
            })}
          />
          <InputRightElement>
            <PhoneIcon />
          </InputRightElement>
        </InputGroup>
        {errors.userName && (
          <ErrorMessage message={errors.userName.message} />
        )}

        <Button 
          type='submit'
          colorScheme='green'
        >Crear cuenta</Button>
      </form>

      <nav className='nav'>
        <Link to={'/auth'}>Inicio</Link>
      </nav>
    </div>
  )
}
