import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Import het service account bestand
const serviceAccount = require('./service-account.json')

// Initialiseer Firebase Admin
const app = initializeApp({
  credential: cert(serviceAccount)
})

export const auth = getAuth(app) 