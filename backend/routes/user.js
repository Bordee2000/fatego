const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt')

router = express.Router();

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT username FROM users WHERE username = ?",
        [value]
    )
    if (rows.length > 0) {
        const message = 'This user is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const registerSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(passwordValidator),
    username: Joi.string().required().min(5).external(usernameValidator),
})

router.post('/user/signup', async (req, res, next) => {
    try {
        await registerSchema.validateAsync(req.body, { abortEarly: false })

    } catch (err) {
        return res.status(400).json(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5)
    const email = req.body.email

    try {
        await conn.query(
            'INSERT INTO users(username, password, email) ' +
            'VALUES (?, ?, ?)',
            // เติมเอง
            [username, password, email,]
        )
        conn.commit()
        res.status(201).send("Register Success")
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

exports.router = router