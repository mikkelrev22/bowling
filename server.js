const express = require('express')
const app = express()
const port = 7666
const Bowl = require('./scoring.js')

app.get('/', (req, res)=>{
  console.log(Bowl.playAGame())
  // res.send(Bowl.playAGame())
})

app.use((err, req, res, next)=>{
  res.sendStatus(404)
})

app.use((err, req, res, next)=>{
  res.sendStatus(500).send(err.stack)
})

app.listen(port, ()=>{
  console.log(`Server is now listening on port ${port}`)
})