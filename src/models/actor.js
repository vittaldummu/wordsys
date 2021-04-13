const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const ActorSchema = mongoose.Schema({
     firstname: {
        type: String,
        required: true,
        trim: true
    },
     lastnamename: {
        type: String,
        required: true,
        trim: true
    },
     password: {
        type: String,
        required: true
    },
     conformpassword: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Not an Email')
        }
    },
   
     mobilenumber: {
        type: Number,
        required: true,
        trim: true
    },
     DOB: {
        type: Date,
        required: true,
        trim: true
    },
     Gender: {
        type: String,
        required: true,
        trim: true
    },
   
    country: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    locality: {
        type: String,
        required: true,
        trim: true
    },
      created_at: {
        type: Date,
        default: Date.now()
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
 {
    timestamps: true
})



ActorSchema.statics.findByCredentials = async function(email, password) {
    const Actor = await Actor.findOne({ email })
    if (!Actor) throw new Error('unable to log in')
    const isMatch = await bcrypt.compare(password, Actor.password)
    if (!isMatch) throw new Error('unable to log in')
    return Actor
}
ActorSchema.methods.toJSON = function() {
    const Actor = this
    const Actorobj_ = Actor.toObject()
    delete Actorobj_.password
    delete Actorobj_.tokens
    return Actorobj_
}

ActorSchema.methods.getAuthtoken = async function() {
    const Actor = this
    const token = jwt.sign({ _id: Actor._id.toString() }, process.env.Actor_password)
    Actor.tokens = Actor.tokens.concat({ token })
    try {
        await Actor.save()
    } catch (e) {
        throw new Error('unable to generate auth token')
    }
    return token
}

ActorSchema.pre('save', async function(next) {
    const Actor = this
    if (Actor.isModified('password')) Actor.password = bcrypt.hashSync(Actor.password, 8)
    next()
})



Actor = mongoose.model('actor', ActorSchema)

module.exports = Actor