import React from 'react'
import { Link } from 'react-router-dom'
import { Spinner, Grid, GridItem } from '@chakra-ui/react'
import './ListArtist.scss'

export function ListArtist({ artists, isLoading, isError }) {

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <Spinner size="lg" />
                <p>Cargando</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center">
                <p className="text-lg font-semibold text-red-500">No se pudo cargar la información, inténtelo más tarde</p>
            </div>
        );
    }

    if (artists.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center">
                <p className="text-lg font-semibold">No se agregó a ningún artista</p>
            </div>
        );
    }

    return (
        <div className='list-artists'>
            <Grid
                templateColumns={{
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                    xl: "repeat(5, 1fr)"
                }}
            >
                {artists.map((artist) => (
                    <GridItem key={artist.id} as={Link} to={`/artists/${artist.id}`} className="list-artists__artist">
                        <div style={{ backgroundImage: `url(${artist.image})` }}></div>
                        <p className="artist-name">{artist.name}</p>
                    </GridItem>
                ))}
            </Grid>
        </div>
    );
}
