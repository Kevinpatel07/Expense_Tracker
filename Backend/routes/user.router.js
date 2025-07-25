const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

userRouter.post('/Signup', (req, res) => {
    try {
        const myPlaintextPassword = req.body.password
        bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
            if (err) {
                return res.status(500).json({ message: "SignUp Error" })
            } else {
                const signUp = new UserModel({ ...req.body, password: hash })
                await signUp.save()
                res.status(201).json({ signUp })
            }
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "SignUp Error" })
    }
})

userRouter.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' })
        }

        const hash = user.password
        const myPlaintextPassword = req.body.password

        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
            if (err) {
                res.status(500).json({ message: "Login Error" })
            } else {
                if (result) {
                    const Accesstoken = jwt.sign({ userID: user._id }, 'Access', { expiresIn: '15m' })
                    const Refreshtoken = jwt.sign({ userId: user._id }, 'Refresh', { expiresIn: '180m' })

                    res.status(200).json({ message: "Login Successful", Accesstoken, Refreshtoken })
                }
            }
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Login Error" })

    }
})


module.exports = userRouter