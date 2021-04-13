const express = require('express')
const jwt = require('jsonwebtoken')
const Producer = require('../models/producer')

const ProducerAuth = async(req, res, next) => {
    try {
        const Authtoken = req.header("Authorization").replace("Bearer", "").trim()
        const decoded = jwt.verify(Authtoken, "Producer_password")
        const Producer = await Producer.findOne({ _id: decoded._id, 'tokens.token': Authtoken })
        req.Producer = Producer
        req.token = Authtoken
        next()
    } catch (error) {
        res.status(401).send({ error: "unable to authorise" })
    }
}

module.exports = ProducerAuth