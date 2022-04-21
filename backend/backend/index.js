const express = require("express")

const app = express();
const cors = require('cors')
const { logger } = require('./middlewares')
app.use(logger)
app.use(cors())

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const detailServantRouter = require('./routes/detailServant')
const commentRouter = require('./routes/teame')
const imageRouter = require('./routes/image')
const userRouter = require('./routes/user')

app.use(indexRouter.router)
app.use(detailServantRouter.router)
app.use(commentRouter.router)
app.use(imageRouter.router)
app.use(userRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})