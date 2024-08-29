import { useQuery } from '@tanstack/react-query'
import { Album } from '../api'

const albumController = new Album()

export const useAlbum = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['albums'],
        queryFn: () => albumController.obtainAll(),
        retry: false,
        refetchOnWindowFocus: false
    })

    return {
        data,
        isLoading,
        isError
    }
}