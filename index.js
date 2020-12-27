import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRouter from './routes/posts.js';

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

app.use('/posts', postRouter)

app.get('/', (req, res) => {
    res.send("Hello to memories API")
})

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb+srv://Shaun:f0QqLrLaYBm4SVix@cluster0.opfq3.mongodb.net/memories?retryWrites=true&w=majority";


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)