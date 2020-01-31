const express = require('express')
const app = express()
const port = 7666
const { PlayAGame } = require('./scoring.js')

app.get('/', (err, req, res, next)=>{
  PlayAGame()
})

app.use((err, req, res, next)=>{
  res.setStatus(404)
})

app.use((err, req, res, next)=>{
  res.setStatus(500).errstack(err)
})

app.listen(port, ()=>{
  console.log(`Server is now listening on port ${port}`)
})