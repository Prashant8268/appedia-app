
module.exports.chatSockets = function(socketServer){

    let io = require('socket.io')(socketServer,{
        cors:{
            origin:'*'
        }
    });

    io.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('join_room',(data)=>{

            console.log('joining request rec.',data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);

        });

        socket.on('send_message',(data)=>{
            console.log('message received', data);
            // below is for sending data to chatroom so all can receive it 
            io.in(data.chatroom).emit('receive_message',data);
        })
        
        socket.on('disconnect',function(){
        console.log('socket connection disconnected')
        })

    });


}