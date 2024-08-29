import { useQuery } from "@tanstack/react-query";
import { Artist } from "../api";

const artistController = new Artist()

export const useArtist = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['artists'],
        queryFn: () => artistController.obtainAll(),
        retry: false,
        refetchOnWindowFocus: false
    })

    return {
        data,
        isLoading,
        isError
    }
}