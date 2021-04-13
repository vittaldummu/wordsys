const express = require('express')
const jwt = require('jsonwebtoken')
const Actor = require('../models/actor')

const ActorAuth = async(req, res, next) => {
    try {
        const Authtoken = req.header("Authorization").replace("Bearer", "").trim()
        const decoded = jwt.verify(Authtoken, "Actor_password")
        const Actor = await Actor.find({ _id: decoded._id, 'tokens.token': Authtoken })
        req.Actor = Actor[0]
        req.token = Authtoken
        next()
    } catch (error) {
        res.status(401).send({ error: "unable to authorise" })
    }
}

module.exports = ActorAuth