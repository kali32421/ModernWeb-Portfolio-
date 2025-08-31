import { initializeApp } from 'firebase/app'
import { get, getDatabase, ref, runTransaction } from 'firebase/database'

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: 'https://devollodb-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})
const database = getDatabase(app)

export const getVisitorCount = async slug => {
  const refPath = ref(database, `${slug}`)
  const snapshot = await get(refPath)
  if (snapshot.exists()) {
    return snapshot.val()
  }
  return 0
}

export const incrementVisitorCount = async slug => {
  const visitorRef = ref(database, `${slug}`)
  await runTransaction(visitorRef, current => {
    if (current === null) {
      return 1
    }
    return current + 1
  })
}

