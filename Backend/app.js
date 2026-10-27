const express = require('express');
require('dotenv').config({ path: '.env' });

const cors = require('cors')

const userRoutes = require('./routers/router-user');
const templateRoutes = require('./routers/router-template')
const mailRoutes = require('./routers/router-mail')
const errorHandler = require('./global-middleware/error-handler')

const app = express()

app.use(cors())
app.use(express.json());

app.use('/users', userRoutes)
app.use('/templates', templateRoutes)
app.use('/mails', mailRoutes)

app.use(errorHandler)
app.use('/', (req, res) => {
    res.status(404).send({ error: "EndPoint not Found" })
})

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})


