export default (io) => {
    let userIds = 0
    console.log('🚀 socket');
    io.on('connection', function(socket){
        const userId = userIds++
        console.log(`user ${userId} connected`);
        socket.on('message', value => {
            console.log(`message [${userId}]:"${value}"`)
            io.emit('message',value)
        })
    });
}