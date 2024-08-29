import { setDoc, doc, collection, getDocs, getDoc, orderBy, limit, query } from 'firebase/firestore'
import {v4 as uuidV4 } from 'uuid'
import { db } from '../config/firebase'

export class Artist {
    
    //Atributo
    collectionName = "artists"

    async create(image, name) {
        try {
            const idArtist = uuidV4()
            const created_at = new Date()
            const data = { id: idArtist, image, name, created_at }
            const docRef = doc(db, this.collectionName, idArtist)
            await setDoc(docRef, data)

        } catch (error) {
            throw error
        }
    }

    async obtainAll(){
        try {

            const docRef = collection(db, this.collectionName)
            const snapShot = await getDocs(docRef)
            const artists = snapShot.docs.map(doc => doc.data())
            return artists
             
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getArtist (id) {
        try {
            const docRef = doc(db, this.collectionName, id)
            const snapshot = await getDoc(docRef)
            return snapshot.data()
            
        } catch (error) {
            throw error
        }
    }

    //Default del limite 20
    async getLastArtist (limitItems = 20) {
        try {
            const collecttionRef = collection(db, this.collectionName)
            const limitRef = limit(limitItems)
            const orderByRef = orderBy("created_at", "desc")
            const queryRef = query(collecttionRef, orderByRef, limitRef)

            const snapshot = await getDocs(queryRef)

            return snapshot.docs.map(doc => doc.data())

        } catch (error) {
            console.error(error)
            throw error
        }
    }
}