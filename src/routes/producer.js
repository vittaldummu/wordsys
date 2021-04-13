const express = require('express')

const Producer = require('../models/producer')

const Auth = require('../middleware/Producerauth')

const {
    Mongoose
} = require('mongoose')
const ProducerRouter = express.Router()

ProducerRouter.post('/producer/register', async (req, res) => {
    try {
        const producer = new producer(req.body)
        const token = await producer.getAuthToken()
        await producer.save()
        res.status(201).send({
            message: "created producer id",
            producer,
            token
        })
    } catch (e) {
        res.status(500).send({
            message: "internal server error"
        })
    }
})





ProducerRouter.get('/producer/me', Auth, async (req, res) => {
    try {
        const producer = req.producer
        if (!producer) return res.status(200).send({
            message: "producer not found"
        }) 
        res.send({
            producer
        })
    } catch (e) {
        res.status(500).send({
            message: "internal server error"
        })
    }
})
           
ProducerRouter.get("/producerlist", async (req,res)=>{
  var response={status:false,msg:"",data:""};
 
  try {
      const results = await ProducerSchema.find({});
      response.status=true;
      response.data=results;
    } catch (err) {
      throw err;
    }
  res.send(response);
});



ProducerRouter.delete('/producer/me', Auth, async (req, res) => {
    try {
        const producer = await producer.deleteOne({
            _id: req.producer._id
        })
        if (!producer) throw ({
            message: {
                message: "unable to delete producer because cannot find in databse"
            },
            https_code: 400
        })
        res.status(200).send({
            message: "producer deleted",
            producer
        })
    } catch (error) {
        res.status(error.https_code).send(error.message)
    }
})

ProducerRouter.post('/producer/logout', Auth, async (req, res) => {
    try {
        req.producer.tokens = req.producer.tokens.filter((token) => token.token != req.token)
        await req.producer.save()
        res.status(200).send({
            message: "producer logged out"
        })
    } catch (e) {
        res.status(500).send({
            message: "internal server error"
        })
    }
})

ProducerRouter.post('/producer/login', async (req, res) => {
    try {
        const producer = await producer.FindByCredentials(req.body.email, req.body.password)
        if (!producer) throw ({
            message: {
                message: "check email or username"
            },
            https_code: 400
        })
        const token = await producer.getAuthToken()
        res.status(200).send({
            producer,
            token
        })
        if (!token) throw ({
            message: {
                message: "unable to login"
            },
            https_code: 500
        })
    } catch (error) {
        res.status(error.https_code).send(error.message)
    }
})

module.exports = ProducerRouter