import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export class Storage {
    async uploadFile(file, folder, nameField) {
        try {
            const storage = getStorage()
            const fileRef = ref(storage, `${folder}/${nameField}`)
            return await uploadBytes(fileRef, file)
        } catch (error) {
            throw error

        }
    }

    async getURLFile (pahtFile) {
        try {
            const storage =  getStorage()
            const fileRef = ref(storage, pahtFile)
            return await getDownloadURL(fileRef)
        } catch (error) {
            throw error
        }
    }
}