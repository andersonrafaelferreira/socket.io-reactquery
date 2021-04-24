import express from 'express'

import socketio from 'socket.io'

import http from 'http'

import path from 'path'

const app = express()
const httpServer = http.createServer(app)
const io = new socketio.Server(httpServer)

app.use(express.static(path.resolve(__dirname, '..', 'public')))

io.on("connection", (socket) => {
  console.log(`New connectio from ${socket.id}`)

  // note that in some cases you don't have to use websocket
  // you can use react query
  // https://react-query.tanstack.com/
  // when returns to the page refetch
  // or page active every 10 second refetch to revalidate

  socket.on('message', message => {
    // console.log(`new message ${message}`)

    socket.emit('received', `Received message ${message}`)

    // socket who's connected
    // io is the Server

    // socket.broadcast // send for all
    // io.emit // send for all
  })

})


httpServer.listen(3333)