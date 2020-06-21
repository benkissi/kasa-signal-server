const http = require('http')
const app = require('./app')
const socketIo = require("socket.io");

const {addUser} = require('./utils/users')
const {generateMessage} = require('./utils/messages')
const {getUser, getUsersInRoom} = require('./utils/users')

const PORT = process.env.PORT || 4001

const server = http.createServer(app)
const io = socketIo(server)

io.on("connection", (socket) => {
  console.log("New client connected");
  // socket.emit('connected', 'you connected')
  
  socket.on('join', ({username, room}, callback) => {
    const {user, error} = addUser({id: socket.id, username, room})
    if(error){
        return callback(error)
    }

    socket.join(user.room)

    socket.emit('message', generateMessage('System', 'Welcome'))
    socket.broadcast.to(user.room).emit('message', generateMessage('System', `${user.username} has joined!`))
    io.to(user.room).emit('roomInfo', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', generateMessage(user.username, message))
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(PORT, () => console.log(`Listening on ${PORT}`))