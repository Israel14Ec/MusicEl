import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDropzone } from 'react-dropzone';
import { useAlbum } from '../../../hooks/useAlbum'
import { Storage, Song } from '../../../api'
import { v4 as uuidv4 } from 'uuid'
import { InputGroup, Input, Button, InputRightElement, Select } from '@chakra-ui/react';
import { CloudArrowUpIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';
import ErrorMessage from '../../utils/ErrorMessage';
import { toast } from 'react-toastify';
import './AddSongForm.scss';
import '../../../scss/buttonStyle.scss';

const storageController = new Storage()
const songController = new Song()

export function AddSongForm({ closeModal }) {
    
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [songName, setSongName] = useState("");
    const [errorSong, setErrorSong] = useState('');
    const [albums, setAlbums] = useState([])
    const [loadingData, setLoadingData ] = useState(false) 
    const { data, isLoading, isError} = useAlbum()
    const queryClient = useQueryClient()
    
    useEffect(() => {
        if(!isLoading &!isError) {
            setAlbums(data.map(album => {
                return {
                    key: album.id,
                    value: album.id,
                    text: album.name
                }
            })) 
        }
    }, [isLoading]) 
    
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setSongName(file.name);
            setValue('song', file); 
            setValue('name', file.name)
            setErrorSong('');
        }
    }, [setValue]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'audio/*': ['.mp3', '.wav', '.ogg'],
        }
    });
    
    
    const { mutate } = useMutation({
        mutationFn: async ({name, album, song}) => {
            setLoadingData(true)
            const response = await storageController.uploadFile(song, "song", uuidv4())
            const url = await storageController.getURLFile(response.metadata.fullPath)
            await songController.create(name, album, url)
        },
        onError: (error) => {
            console.error(error)
            toast.error('No se pudo subir la canción')
        },
        onSuccess: () => {
            toast.success('Se subió la canción')
            queryClient.invalidateQueries({queryKey: 'lastSong'})
            closeModal()
        },
        //Se ejecuta sin importar el resultado de la mutación
        onSettled: () => setLoadingData(false)
    })

    const handleForm = (dataForm) => {
        if (!dataForm.song) {
            setErrorSong('Ingrese una canción');
            return;
        }
        mutate(dataForm)

    };

    return (
        <form onSubmit={handleSubmit(handleForm)} noValidate className='add-song-form'>
            <label htmlFor="name">Canción</label>
            <InputGroup>
                <Input 
                    id='name'
                    type='text'
                    placeholder='Ingresa el nombre de la canción'
                    {...register('name', {
                        required: 'Ingrese el nombre'
                    })}
                />
                <InputRightElement>
                    <MusicalNoteIcon className='w-5'/>
                </InputRightElement>
            </InputGroup>
            {errors.name && (
                <ErrorMessage message={errors.name.message} />
            )}

            <div className='mb-2'></div>
            
            <label htmlFor="album">Album</label>
            <Select placeholder='Seleccione al álbum al que pertenece'
                {...register('album', {
                    required: 'Seleccione un álbum'
                })}
            >
                {isLoading ? (
                    <option disabled>Cargando...</option>
                    )
                    :
                    (
                        albums.map( (album) => (
                            <option className='text-gray-700' key={album.key} value={album.value}>
                                {album.text}
                            </option>
                        ))
                    )
                }
            </Select>
            {errors.album && (
                <ErrorMessage message={errors.album.message} />
            )}

            <div className='add-song-form__file' {...getRootProps()}>
                <input {...getInputProps()} />
                <CloudArrowUpIcon className='w-12 mr-5'/>
                <div>
                    <p>Arrastra tu canción o haz clic <span>aquí</span></p>
                    {songName && (<p className='song-name'>{songName}</p>)}
                </div>
            </div>
            {errorSong && (
                <ErrorMessage message={errorSong} />
            )}

            <Button type='submit' className='button_green' isLoading={loadingData} loadingText="Subiendo ...">
                Subir canción
            </Button>
        </form>
    );
}
