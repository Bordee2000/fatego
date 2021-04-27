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

async function emailValidator(value) {
    const [rows, _] = await pool.query(
        "SELECT username FROM users WHERE email = ?",
        [value]
    )
    if (rows.length > 0) {
        const message = 'This email is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const registerSchema = Joi.object({
    email: Joi.string().required().email().external(emailValidator),
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
    const password = await bcrypt.hash(req.body.password, 10)
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


async function verifyPassword(password, hash) {
    // Verifies the input password if it matches the hash
    // using the bcrypt compare method,
    // and return a boolean result accordingly.
    return await bcrypt.compare(password, hash);
  }

router.get('/user/signup', async (req, res, next) => {
    email = req.body.email
    password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try{
        const sqlUser = 'SELECT * FROM users WHERE email = ?'
        const [rows, cols] = await conn.query(sqlUser, [email])
        // encapPassword = await bcrypt.hash(password, 10)
        matched = await verifyPassword(password, rows[0].password);
        console.log("Ckeck = " + matched);

        if (rows.length === 1 && matched) {
            // console.log("Have Email && Password match")
            return res.json({ state: true,
                              reason: "Have Email && Password match",
                              userData: rows[0]
                            });
        }
        else if (rows.length === 1){
            // console.log("Password incorrect")
            return res.json({ state: false,
                              reason: "Password incorrect",
                            });
        }

        await conn.commit()
        // return res.json(rows)
    }catch(err){
        await conn.rollback();
        console.log(err)
        return res.status(500).json({ state: false,
                                      error: "Email not found!"
                                    })
    }finally{
        conn.release()
    }

})


exports.router = router