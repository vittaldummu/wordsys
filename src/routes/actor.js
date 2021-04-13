const express = require('express')
const Actor = require('../models/actor')
const Auth = require('../middleware/Actorauth')

const ActorRouter = express.Router()

ActorRouter.post('/actor/register', async(req, res) => {
    try {
        const actor = new actor(req.body)
        const token = await actor.getAuthtoken()
        await actor.save()
        res.status(201).send({ message: "created actor id", actor, token })
    } catch (e) {
        res.status(500).send({ message: "Incorrect email ID or ID with emails exists" })
    }
})


// ActorRouter('/EditActor').get(authorize, (req, res, next) => {
//     ActorSchema.findById(req.params.id, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: not working
//             })
//         }
//     })
// })

ActorRouter.get("/actorlist", async (req,res)=>{
  var response={status:false,msg:"",data:""};
 
  try {
      const results = await ActorSchema.find({});
      response.status=true;
      response.data=results;
    } catch (err) {
      throw err;
    }
  res.send(response);
});

ActorRouter.get('/actor/me', Auth, async(req, res) => {
    try {
        const actor = req.actor
        if (!actor) return res.status(404).send({ message: "not found" })
        res.status(200).send(actor)
    } catch (e) {
        res.status(500).send({ message: "internal server error" })
    }
})

ActorRouter.delete('/actor/me', Auth, async(req, res) => {
    try {
        const actor = await actor.deleteOne({ _id: req.actor._id })
        const products = await Product.deleteMany({owner: req.actor._id})
        if (!actor) return res.send({ message: "unable to delete" })
        res.status(200).send({ message: "actor deleted", actor })
    } catch (e) {
        res.status(500).send({ message: "internal server error" })
        console.log(e)
    }
})

ActorRouter.post('/actor/login', async(req, res) => {
    try {
        const actor = await actor.findByCredentials(req.body.email, req.body.password)
        const token = await actor.getAuthtoken()
        res.status(200).send({ actor, token })
    } catch (e) {
        res.status(500).send({ message: e })
        console.log(e)
    }
})

ActorRouter.post('/actor/logout', Auth, async(req, res) => {
    try {
        req.actor.tokens = req.actor.tokens.filter((token) => token.token != req.token)
        await req.actor.save()
        res.status(200).send({ message: "actor logged out" })
    } catch (e) {
        res.status(500).send({ message: "internal server error" })
    }
})




module.exports = ActorRouter