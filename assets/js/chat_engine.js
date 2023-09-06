class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:8000')
        if(this.userEmail){
            console.log('check point 1')
            this.connectionHandler();
        }
    }

    connectionHandler(){
        this.socket.on('connect',()=>{
            console.log('connection establish using sockets...!')
        })


    }
}