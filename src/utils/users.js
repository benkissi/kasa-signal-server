const users = []

const addUser = ({id, username, room}) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if(!username || !room){
        return {
            error: 'Username and room are required'
        }
    }

    const existingUser = users.find(user => {
        return user.room === room && user.username === username
    })

    if(existingUser) {
        return {error: 'Username is in use in this room'}
    }

    const user = {
        id,
        username,
        room
    }

    users.push(user)
    return {user}
}

const getUser = (id) => {
    return user = users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    const roomUsers = users.filter((user) => user.room === room)
    return roomUsers.map((user) => user.username)
}

module.exports = {
    addUser,
    getUser,
    getUsersInRoom
}