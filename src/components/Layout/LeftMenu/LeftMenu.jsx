import React, {useState } from 'react'
import { VStack, Button, Icon } from '@chakra-ui/react'
import { BasicModal } from '../../Shared'
import { HomeIcon, PlayCircleIcon, UserGroupIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import LinkNav from '../../utils/LinkNav'
import "./LeftMenu.scss"
import { NewArtistForm } from '../../artist/NewArtistForm/NewArtistForm'
import { AddAlbumForm } from '../../Albums'
import { AddSongForm } from '../../Song/AddSongForm/AddSongForm'

export function LeftMenu() {

    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('')
    const [contentModal, setContentModal] = useState(null)

    
    const dataLink = [
        {name: 'Inicio', to:'/', icon:HomeIcon},
        {name: 'Artistas', to:"/artists", icon:PlayCircleIcon},
        {name: 'Albumes', to:"/albums", icon: UserGroupIcon},
    ]

    //Cierra el modal
    const closeModal = () => {
        setShowModal(false)
        setTitle('')
        setContentModal(null)
    }

    const openModal = (type) => {

        switch(type) {
            case "artist": 
                setTitle("Nuevo artista")
                setContentModal(<NewArtistForm closeModal={closeModal}/>)
                break
            case "album": 
                setTitle("Nuevo Albúm")
                setContentModal(<AddAlbumForm closeModal={closeModal}/>)
                break

            case "song": 
                setTitle("Nueva canción")
                setContentModal(<AddSongForm closeModal={closeModal}/>)
                break
        }

        setShowModal(true)

    }
    


    return (
    <>    
        <div className='left-menu'>
            <nav className=' flex flex-col gap-3'>
            {dataLink.map((link, index) => {
                const Icon = link.icon;
                    return (
                        <LinkNav key={index} dataLink={link}>
                            <Icon/>
                        </LinkNav>
                    );
                })}
            </nav>
        

            <VStack align="stretch">
                <Button  
                    leftIcon={<Icon as={PlusCircleIcon} />} 
                    variant={'ghost'} 
                    color="gray" 
                    justifyContent="flex-start"
                    onClick={() => openModal("song")}
                >
                    Nueva canción
                </Button>

                <Button  
                    leftIcon={<Icon as={PlusCircleIcon} />} 
                    variant={'ghost'} 
                    color="gray" 
                    justifyContent="flex-start"
                    onClick={() => openModal("album")}
                >
                    Nuevo Albúm
                </Button>

                <Button  
                    leftIcon={<Icon as={PlusCircleIcon} />} 
                    variant={'ghost'} 
                    color="gray" 
                    justifyContent="flex-start"
                    onClick={() => openModal("artist")}
                >
                    Nuevo Artista
                </Button>
            </VStack>
        </div>

        <BasicModal
            isOpen={showModal}
            onClose={closeModal}
            title={title}
            children={contentModal}
        />
    </>
  )
}
