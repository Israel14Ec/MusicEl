import { v4 as uuidv4 } from "uuid"
import { setDoc, doc, where, collection, query, getDocs, orderBy, limit } from 'firebase/firestore'
import { db } from "../config/firebase"

export class Song {
    collectionName = "songs"

    async create(name, album, file) {
        try {
            const id = uuidv4()
            const created_at = new Date()
            const data = {id, name, album, file, created_at}

            const docRef = doc(db, this.collectionName, id)
            await setDoc(docRef, data)

        } catch (error) {
            throw error
        }
    }

    //Obtener por el album
    async obtainAllByAlbum (idAlbum) {
        try {
            const whereRef = where("album", "==", idAlbum)
            const collectionRef = collection(db, this.collectionName)
            const queryRef = query(collectionRef, whereRef)
            
            const snapshot = await getDocs(queryRef)
            const data = snapshot.docs.map(doc => doc.data() )
            return data

        } catch (error) {
            throw error
        }
    }

    //Obtener ultimas canciones
    async getLastSongs (limitItem = 20) {
        try {   
            const collectionRef = collection(db, this.collectionName)
            const orderbyRef = orderBy("created_at", "desc")
            const limitRef = limit(limitItem)
            const queryRef = query(collectionRef, orderbyRef, limitRef)

            const snapshot = await  getDocs(queryRef)
            return snapshot.docs.map(doc => doc.data())

        } catch (error) {
            console.error(error);
            throw error
        }
    }
}