const express = require('express')
require('dotenv').config()
const ActorRoute = require('./routes/actor')
const ProducerRoute = require('./routes/producer')
require('./db/connection')

const app = express()
jobRoutes = require("./routes/jobs");
auditionRoutes = require("./routes/auditions");
app.use(express.json())
app.use(ActorRoute)
app.use(ProducerRoute)
app.use(auditionRoutes)
app.use(jobRoutes)
// app.use(message)
const PORT = process.env.PORT || 3003

app.get('*', async (req, res) => {
    res.status(400).send({ message: "it working", 
                        })
})

app.post('*', async (req, res) => {
    res.status(400).send({ message: "it works", 
                        })
})

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})