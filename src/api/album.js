import { doc, setDoc, collection, getDocs, getDoc, where, query, limit, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { v4 as uuidv4 } from 'uuid'


export class Album {

    collectionName = 'albums'

    async create(name, image, artist) {
        try {
            const id = uuidv4()
            const created_at = new Date()

            const data = {id, name, image, artist, created_at}
            const docRef = doc(db, this.collectionName, id)
            await setDoc(docRef, data)

        } catch (error) {
            throw error
        }
    }

    async obtainAll() {
        try {
            const collectionRef = collection(db, this.collectionName)
            const snapshot = await getDocs(collectionRef)
            return snapshot.docs.map(doc => doc.data())

        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getAlbum (id) {
        try {
            const docRef = doc(db, this.collectionName, id)
            const snapshot = await getDoc(docRef)
            return snapshot.data()

        } catch (error) {
            console.error(error)
            throw error
        }
    }

    //Album x artisa
    async getAlbumsByArtist (idArtist) {
        try {
            const whereRef = where('artist', '==', idArtist)
            const collectionRef = collection(db, this.collectionName)
            const queryRef = query(collectionRef, whereRef)

            const snapshot = await getDocs(queryRef)
            return snapshot.docs.map(doc => doc.data() )
        } catch (error) {
            throw error
        }
    }

    async getLastAlbum (limitItem = 20) {
        try {
            const collectionRef = collection(db, this.collectionName)
            const orderbyRef = orderBy("created_at", "desc")
            const limitRef = limit(limitItem)
            const queryRef = query(collectionRef, orderbyRef, limitRef)
            
            const snapshop = await getDocs(queryRef)
            return snapshop.docs.map(doc => doc.data())

        } catch (error) {
            console.error(error)
            throw error
        }
    }
}