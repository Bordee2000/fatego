const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')

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
        return res.status(400).send(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 10)
    const email = req.body.email

    try {
        await conn.query(
            'INSERT INTO users(username, password, email, role) ' +
            'VALUES (?, ?, ?, ?)',
            [username, password, email, "user"]
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

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })

router.post('/user/login', async (req, res, next) => {
    // console.log(req);
    // console.log(password);
    try {
            await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
            return res.status(400).send(err)
    }

    const email = req.body.email
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try{
        const sqlUser = 'SELECT * FROM users WHERE email = ?'
        const [rows, cols] = await conn.query(sqlUser, [email])
        // console.log(rows);
        matched = await verifyPassword(password, rows[0].password);
        // console.log("Ckeck = " + matched);

        if (rows.length === 1 && matched) {


            // Check if token already existed
            const [tokens] = await conn.query('SELECT * FROM tokens WHERE user_id=?', [rows[0].id])

            let token = tokens[0]?.token
            if (!token) {
                // Generate and save token into database
                token = generateToken()
                await conn.query(
                    'INSERT INTO tokens(user_id, token) VALUES (?, ?)', 
                    [rows[0].id, token]
                )
            }
            return res.status(200).json({ state: true,
                                          message: "Login success",
                                          reason: "Have Email && Password match",
                                          userData: rows[0],
                                          'token': token
                                        });
        }
        else if (rows.length === 1){
            // console.log("Password incorrect")
            return res.status(400).json({ state: false,
                              reason: "Password incorrect",
                            });
        }

        await conn.commit()
        // return res.json(rows)
    }catch(err){
        await conn.rollback();
        console.log(err)
        return res.status(500).json({ state: false,
                                      reason: "Email not found!"
                                    })
    }finally{
        conn.release()
    }

})

router.get('/user/me', isLoggedIn, async (req, res, next) => {
        res.json(req.user)
    })


exports.router = router