class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:8000')
        if(this.userEmail){
            this.connectionHandler();
        }
    }



    connectionHandler(){

        let self = this;
        this.socket.on('connect',()=>{
            console.log('connection establish using sockets...!')
            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom: 'codeial'

            });
            self.socket.on('user_joined',(data)=>{
                console.log('a user joined',data);
            });

        });

        $(`#send-message`).click(function(){
            
            let msg = $(`#msg`).val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codeial'
                })
            }
        });

        self.socket.on('receive_message',(data)=>{

            let newMsg = document.createElement('li');
            let msgType = 'other-msg';
            if(data.user_email==self.userEmail){
                msgType='self-msg'
            };
            newMsg.textContent = data.message;
            newMsg.className=msgType;
            document.getElementById('message-list').append(newMsg)
        })


    }
}


 