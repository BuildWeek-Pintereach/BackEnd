const express = require('express')
const bodyParser = require('body-parser')
const { Photon } = require('@generated/photon')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
/* const restricted = require('../auth/restricted') */

require('dotenv').config()


const photon = new Photon()
const app = express()

app.use(bodyParser.json())

app.get('/users', async (req, res) => {
    const users = await photon.users.findMany({
        include: {
            articles: {
                include: {
                    categories: {
                        select: {
                            type: true
                        }
                    }
                }
            }
        }
    })
    res.json(users)
})

app.get(`/categories`, async (req, res) => {
    const categories = await photon.categories.findMany({
        select: {
            type: true
        }
    })
    res.json(categories)
})

app.delete(`/article/:id`, async (req, res) => {
    const { id } = req.params
    const article = await photon.articles.delete({
        where: {
            id,
        },
    })
    res.json(article)
})

app.get(`/:id/articles`, async (req, res) => {
    const { id } = req.params
    const articlesByUser = await photon.users.findOne({
        where: { id }
    }).articles()
    res.json(articlesByUser)
})

app.post(`/:id/article`, async (req, res) => {
    const { title, url, type } = req.body
    const { id } = req.params
    const newarticle = await photon.articles.create({
        data: {
            title: title,
            url: url,
            creator: {
                connect: {
                    id: id
                }
            },
            categories: {
                connect: {
                    type: type
                }
            }
        }
    })
    res.json(newarticle)
})


app.post(`/register`, async (req, res) => {
    let { firstname, lastname, email, password } = req.body

    const hash = bcrypt.hashSync(password, 12);
    password = hash;

    const newuser = await photon.users.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        }
    })
    res.json(newuser)
})


app.post(`/login`, async (req, res) => {
    let { email, password } = req.body

    const userbyemail = await photon.users.findMany({
        where: {
            email: email,
            password: password
        }
    })

    if (userbyemail.length > 0) {
        const user = (userbyemail[0])
        const token = generateToken(user);

        res.status(200).json({
            Message :'You are logged in',
            token
        })

    } else {
        res.status(400).json({message : 'Error'})
    }
})


function generateToken(userbyemail) {
    const payload = {
        subject: userbyemail.id,
    };
    
    const secret = 'abcdefg';
    
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secret, options)
}





const PORT = process.env.PORT || 3300;

const server = app.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
