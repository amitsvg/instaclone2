const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const USER = mongoose.model("USER")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Jwt_secret } = require("../keys");
const Jwt_secret  = process.env.Jwt_secret
const requireLogin = require('../middlewares/requireLogin');

router.get('/', (req, res) => {
    res.send("server is hi hi");
})

router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body;
    if (!name || !email || !userName || !password) {
        return res.status(422).json({ error: "Please fill all the fields", warnkaro: " ओ .. अच्छे से फॉर्म भर !!" })
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ Error: "USer arlready exist with this email or username" })
        }
        bcrypt.hash(password, 10).then((hashedPassword) => {

            const user = new USER({
                name,
                email,
                userName,
                password: hashedPassword
            })

            user.save(user)
                .then(user => { res.json({ message: "Registered successfully" }) })
                .catch(err => { console.log(err) })

        })

    })

})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please fill email and password" })
    }

    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email" })
        }
        bcrypt.compare(password, savedUser.password)
            .then((match) => { 
                if (match) {
                    // return res.status(200).json({ message: "Signed in Successfully" })
                    const token = jwt.sign({_id:savedUser.id}, Jwt_secret)
                    const { _id, name, email, userName } = savedUser
                    // res.json(token)
                    // console.log(token)
                    res.json({token, user: {_id, name, email, userName}})
                    // console.log({token, user: {_id, name, email, userName}})
                } else {
                    return res.status(422).json({ error: "Invalid Password" })
                }
            })
            .catch(err => console.log(err))
    })
})


module.exports = router;