import express from 'express'

const port = 4000
const app = express()


// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>")
})


app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
