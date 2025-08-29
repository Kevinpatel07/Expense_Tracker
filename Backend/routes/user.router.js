const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const UserModel = require('../models/User.model');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "patelkevin782002@gmail.com",
        pass: "ucmr oarb husg expr",
    },
});

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
                    const Accesstoken = jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET, { expiresIn: '5m' })
                    const Refreshtoken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, { expiresIn: '60m' })

                    res.status(200).json({ message: "Login Successful", Accesstoken, Refreshtoken })
                } else {
                    res.status(500).json({ message: "Wrong Password" })
                }
            }
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Login Error" })
    }
})

userRouter.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(404).json({ message: "No Refresh Token Found" })
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_SECRET, { expiresIn: "5m" })

        res.status(200).json({ newAccessToken })

    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' })

    }
})

userRouter.post('/forget-password', async (req, res) => {
    try {
        const { email } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        const token = jwt.sign({ userId: user._id }, 'forget-password-token', { expiresIn: "60m" })
        const resetlink = `expense-tracker-web-seven.vercel.app/Resetpassword/${token}`

        const info = await transporter.sendMail({
            from: '<patelkevin782002@gmail.com>',
            to: user.email,
            subject: "Reset Password Link",
            html: `<b>Hi ${user.username}</b>
                <p>We received a request to reset your password. Please click bellow and finish the process</p>
                <p>Reset Password Link ${resetlink}</p>
                <p>Token for password reset expires in 1 hour</p
                <p>if you don’t want to reset your password, you can just ignore this email. Your password will not change.</p>`
            , // HTML body
        });

        res.status(200).json({ message: 'Password Reset link Send to Registered Mail' })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "forget-password error" })
    }
})

userRouter.post('/reset-password', (req, res) => {
    try {
        const { newPassword, token } = req.body

        if (!token) {
            return res.status(404).json({ message: "No Token Found" })
        }

        decoded = jwt.verify(token, "forget-password-token")
        const myPlaintextPassword = newPassword
        bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
            if (err) {
                return res.status(500).json({ message: "Reset Password Error" })
            } else {
                const user = await UserModel.findById(decoded.userId)
                user.password = hash
                await user.save()
                res.status(200).json({ message: "Password Reset Successfully , Please Login Again" })
            }
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Reset Password Error" })

    }
})


module.exports = userRouter