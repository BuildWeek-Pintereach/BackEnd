const express = require('express')
const bodyParser = require('body-parser')
const { Photon } = require('@generated/photon')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const photon = new Photon()
const app = express()

app.use(bodyParser.json())

// Endpoint that display a graph of all the Users
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

// Endpoint that return ALL categories
app.get(`/categories`, async (req, res) => {
    const categories = await photon.categories.findMany({
        select: {
            type: true
        }
    })
    res.json(categories)
})


// Endpoint that delete an article (with the ID)
app.delete(`/article/:id`, async (req, res) => {
    const { id } = req.params
    const article = await photon.articles.delete({
        where: {
            id,
        },
    })
    res.json(article)
})

// Endpoint that GET all the articles from one user
app.get(`/:id/articles`, async (req, res) => {
    const { id } = req.params
    const articlesByUser = await photon.users.findOne({
        where: { id }
    }).articles()
    res.json(articlesByUser)
})

// Endpoint that create a new article, from one user
app.post(`/:id/article`, async (req, res) => {
    const { title, url } = req.body
    const { id } = req.params
    const newarticle = await photon.articles.create({
        data: {
            title: title,
            url: url,
            creator: {
                connect: {
                    id: id
                }
            }
        }
    })
    res.json(newarticle)
})


// Endpoint that create a new user
app.post(`/register`, async (req, res) => {
    let { username, password } = req.body

    const hash = bcrypt.hashSync(password, 12);
    password = hash;

    const newuser = await photon.users.create({
        data: {
            username: username,
            password: password,
        }
    })
    res.json(newuser)
})

const PORT = process.env.PORT || 3300;

const server = app.listen(PORT, () => {
	console.log(`\n=== Server listening on port ${PORT} ===\n`);
});


