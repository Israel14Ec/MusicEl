import React from 'react'
import "./BasicModal.scss"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,

} from '@chakra-ui/react'

export function BasicModal({isOpen, onClose ,title, children}) {

    return (
        <Modal isOpen={isOpen} isCentered onClose={onClose} motionPreset='slideInBottom' size="xl"                                                                                                                                      >
            <ModalOverlay backdropFilter="blur(2px)"/>
            <ModalContent backgroundColor="gray.900">                                                                      
                <ModalHeader>
                    <h1>{title}</h1>
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
