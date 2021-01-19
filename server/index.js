const express = require('express')

const cors = require('cors')


const app = express()


app.use(express.json({extended: true}))

app.use(cors())

//ROUTES WILL GO IN HERE
app.use('/api', require('./routes/userRoutes'))

app.use('/api', require('./routes/postRoutes'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`app started on port ${PORT}`))
