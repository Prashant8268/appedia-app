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
        let user1;
        let user2;
        console.log('at conntect socket client')
        this.socket.on('connect',async()=>{
            console.log('connection establish using sockets...!');
            let isPresent;


            await $.ajax({
                type: 'post',
                url: '/chats/r-chats-present',
                data: {
                    userEmail:self.userEmail
                },
                success: (data)=>{
                    isPresent = data.chatroom;
                    self.loggedUser = user1;
                    user1= data.user1;
                    user2 = data.user2;

                },
                error: (err)=>{
                    console.log(err, '<--err at chats_section.js')
                }
            })

            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom: isPresent.name
            });
            self.socket.on('user_joined',(data)=>{
                console.log('a user joined',data);
            });


            const chats = document.querySelector('.chats');
            chats.classList.remove('hide');
            const singleChat = document.querySelector('.single-chat');
    
            for(let message of isPresent.messages){
                const newMsg = document.createElement('div');
                console.log(message,'message')
                if(message.sender==user1){
                    newMsg.className='self'
                }
                else{
                    newMsg.className='other'
                }
                newMsg.innerHTML=message.content;
                singleChat.append(newMsg);
            }

            $(`#send-message`).click(function(){
                let msg = $(`#msg`).val();
                if(msg!=''){
                    self.socket.emit('send_message',{
                        message:msg,
                        user1,
                        user2,
                        chatroom:isPresent.name
                    })
                };
            });

        });



        

        self.socket.on('receive_message',(data)=>{
            const singleChat = document.querySelector('.single-chat');
            let newMsg = document.createElement('div');
            let msgType = 'other';
            if(user1==data.message.sender){
                msgType='self'
            };
            newMsg.textContent = data.message.content;
            newMsg.className=msgType;
            singleChat.append(newMsg);
        })


    }
}




const openChatElements = document.querySelectorAll('.open-chat');

openChatElements.forEach((element) => {
  element.addEventListener('click', async function () {
    // You can access the clicked element using "this" or "element" variable
    const chatsContainer = document.getElementById('chats-container');
    chatsContainer.classList.add('hide');
    const user_Email = this.getAttribute('user_Email');

    new ChatEngine('single-chat',user_Email);

  });
});






