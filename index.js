import express from 'express'
import { application } from 'express'
import { credentials } from './credentials.js'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const app = express()
const PORT = 4000
app.use(express.json())
const dbConnect = credentials

function getCeleb (req ,res){
    const db = dbConnect()
    db.collection('celebs')
    .get(doc)
    .then((collection) => {
        const celeb = collection.docs().map((doc) => doc.data)
        res.send(celeb)
    })
    .catch((err) => handleEroor(err,res))
}

function createCeleb (req,res){
    const newCeleb = req.body
    const db = dbConnect()
    db.collection('celebs')
    .add(newCeleb)
    .then((doc) => {
        res.status(201).send({
            success: true,
            id: doc.id
        })
    })
    .catch((err) => handleError (err, res))
}

app.get('/getcelebs', getCeleb)
app.post('/postcelebs', createCeleb)



app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
