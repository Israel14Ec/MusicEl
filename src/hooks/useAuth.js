import { useQuery } from '@tanstack/react-query'
import { User } from '../api/user'

const userController = new User()

export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const profile = await userController.getProfile()
            return { ...profile } // Clonar el objeto para forzar el re-render
        },
        retry: false,
        refetchOnWindowFocus: false
    })

    return {
        data,
        isError,
        isLoading
    }
}
