const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const ProducerSchema = mongoose.Schema({
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

ProducerSchema.pre('save', async function (next) {
    const Producer = this
    if (Producer.isModified('password')) Producer.password = bcrypt.hashSync(Producer.password, 8)
    next()
})

ProducerSchema.methods.toJSON = function () {
    const Producer = this
    const Producer_ = Producer.toObject()
    delete Producer_.password
    delete Producer_.tokens
    return Producer_
}
ProducerSchema.methods.getAuthToken = async function () {
    const Producer = this
    const token = jwt.sign({
        _id: Producer._id.toString()
    }, process.env.Producer_password)
    Producer.tokens = Producer.tokens.concat({
        token
    })
    try {
        await Producer.save()
    } catch (e) {
        throw new Error('unable to generate auth token')
    }
    return token
}
ProducerSchema.statics.FindByCredentials = async function (email, password) {
    Producer = await Producer.findOne({
        email
    })
    if (!Producer) throw new Error('unable to login')
    isMatch = await bcrypt.compare(password, Producer.password)
    if (!isMatch) throw new Error('unable to login')
    return Producer
}
Producer = mongoose.model('producer', ProducerSchema)

module.exports = Producer