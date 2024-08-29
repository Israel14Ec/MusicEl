import { getAuth, updateProfile, EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail,
    updatePassword
 } from 'firebase/auth'

export class User {

    async getProfile(){
        try {
            const data = getAuth()
            return data.currentUser
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async updateAvatarUser(url) {
        try {
            const auth = getAuth()
            await updateProfile(auth.currentUser, {
                photoURL: url
            })
        } catch (error) {
            throw error
        }
    }

    async updateDisplayName (displayName) {
        try {
            const auth = getAuth()
            await updateProfile(auth.currentUser, {
                displayName
            })
        } catch (error) {
            throw(error)
        }
    }


    // Actualiza el email 
    async updateUserEmail({ newEmail, password }) {
        try {
            const auth = getAuth()
            const currentUserEmail = auth.currentUser.email
            const credentials = EmailAuthProvider.credential(currentUserEmail, password) // Autenticación

            await reauthenticateWithCredential(auth.currentUser, credentials)
            await verifyBeforeUpdateEmail(auth.currentUser, newEmail) // Cambia el email

        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                throw new Error('La contraseña es incorrecta')
            } else if (error.code === 'auth/operation-not-allowed') {
                throw new Error('La operación no está permitida')
            } else if (error.code === 'auth/email-already-in-use') {
                throw new Error('El nuevo email ya está en uso por otro usuario')
            } else {
                throw new Error('Se produjo un error al actualizar el email. Inténtelo de nuevo más tarde.')
            }
        }
    }

    async updateUserPassword ({currentPassword, newPassword}) {
        try {
            const auth = getAuth()
            const email = auth.currentUser.email

            const credential = EmailAuthProvider.credential(email, currentPassword)
            await reauthenticateWithCredential(auth.currentUser, credential)
            await updatePassword(auth.currentUser, newPassword)

        } catch (error) {
            console.error(error)
            if(error.code === 'auth/invalid-credential') {
                throw new Error('La contraseña es incorrecta')
            }
            else {
                throw new Error('Se produjo un error al actualizar la contraseña, intentelo más tarde.')
            }
        }
    }
}