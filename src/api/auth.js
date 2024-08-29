import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'


export class Auth {

    //Crear cuenta
    async register(email, password, userName) {
        try {
            const auth = getAuth()
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, { displayName: userName })

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    //Desloguearse
    async logout() {
        try {
            const auth = getAuth()
            await signOut(auth)
        } catch (error) {
            console.log(error)
            throw(error)
        }
    }

    //Loggin
    async login (email, password) {
        try {
            const auth = getAuth()
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {

            if(error.code === 'auth/invalid-credential') {
                throw new Error('Usuario o contraseña incorrectos, inténtelo de nuevo')
            }
            else {
                throw new Error('No se pudo iniciar sesión, inténtelo mas tarde.')
            }
        }
    }
}