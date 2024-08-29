import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'
import './ListAlbum.scss'

export function ListAlbum({ albums }) {

    if (albums.length === 0) {
        return (
            <p className="text-lg font-semibold text-center">No se agregó a ningún artista</p>
        );
    }

    return (
        <div className='list-albums'>
            <Grid
                templateColumns={{
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                    xl: "repeat(5, 1fr)"
                }}
                gap={6}
            >
                {
                    albums.map( album => (
                        <GridItem key={album.id} as={Link} to={`/albums/${album.id}`} className='list-albums__album'>
                            <img src={album.image} alt={album.name}></img>
                            <p> {album.name} </p>
                        </GridItem>
                    ))
                }

            </Grid>
        </div>
    )
}
