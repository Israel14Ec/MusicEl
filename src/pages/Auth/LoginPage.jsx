import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { EmailIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Auth } from '../../api/auth'
import { toast } from 'react-toastify'
import ErrorMessage from '../../components/utils/ErrorMessage'
import './Login.scss'

const auth = new Auth()

export default function LoginPage() {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(!show)

  const handleForm = async ({email, password}) => {
    try {
      await auth.login(email, password)
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='login-form'>
      <h1>Música para todos</h1>
      <form onSubmit={handleSubmit(handleForm)} noValidate>
        <label htmlFor="email" >Email:</label>
        <InputGroup mt="1">
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
            <EmailIcon />
          </InputRightElement>
        </InputGroup>

        {errors.email && (
          <ErrorMessage message={errors.email.message} />
        )}

        <div className='mt-5'></div>

        <label htmlFor="password">Contraseña:</label>
        <InputGroup  mt='1'>
          <Input
            id='password'
            type={show ? 'text' : 'password'}
            placeholder='Ingrese la contraseña'
            autoComplete='on'
            {...register('password', {
              required: 'Se requiere ingresar una contraseña'
            })}
          />
          <InputRightElement onClick={handleShow}>
            {show ? <ViewIcon /> : <ViewOffIcon />}
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <ErrorMessage message={errors.password.message} />
        )}

        <Button
          type='submit'
          colorScheme='green'
        >Iniciar sesión
        </Button>
      </form>

      <div className='login-form__options'>
        <p><Link to={'/auth'}>Volver </Link></p>
        <p>¿No tienes  cuenta?<span><Link to={'/auth/register'}>Registrarse</Link></span></p>
      </div>
    </div>
  )
}
