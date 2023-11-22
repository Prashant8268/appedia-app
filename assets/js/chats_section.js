
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
            let firstLi = chats.querySelector('li');
            if (firstLi) {
                // Remove the first <li> element
                chats.removeChild(firstLi);
              }
            const singleChat = document.querySelector('.single-chat');
            while (singleChat.firstChild) {
                singleChat.removeChild(singleChat.firstChild);
            }
            const li = document.createElement('li');
            const heading = document.createElement('div');
            heading.classList.add('chat-heading')
            const img = document.createElement('img');
            img.src = user2.avatar;
            heading.innerText=user2.name;
            heading.prepend(img);
            li.append(heading);
            chats.prepend(li);

            
            for(let message of isPresent.messages){
                const newMsg = document.createElement('div');
                if(message.sender==user1){
                    newMsg.className='self'
                }
                else{
                    newMsg.className='other'
                }
                newMsg.innerHTML=message.content;
                singleChat.append(newMsg);
            }

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-chats');
            deleteButton.id=isPresent;
            deleteButton.innerHTML = "Delete";
            heading.append(deleteButton);
            deleteButton.addEventListener('click',async(e)=>{
                console.log('delete btn clicked')
                await $.ajax({
                    type: 'post',
                    url: '/chats/delete-chats',
                    data: {
                        chatroom:isPresent
                    },
                    success: (data)=>{
                        while (singleChat.firstChild) {
                            singleChat.removeChild(singleChat.firstChild);
                        }
    
                    },
                    error: (err)=>{
                        console.log(err, '<--err at chats_section.js')
                    }
                })

            })

            const myForm = document.getElementById('send-form');
            myForm.addEventListener("submit", function (event) {
                event.preventDefault();
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
                const msgInput = document.getElementById("msg");
                msgInput.value = "";
            });
            let msg = $(`#msg`).val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message:msg,
                    user1,
                    user2,
                    chatroom:isPresent.name
                })
            };
            const msgInput = document.getElementById("msg");
            msgInput.value = "";

            })

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
            singleChat.scrollTop = singleChat.scrollHeight;
        })


    }
}



const openChatElements = document.querySelectorAll('.open-chat');
let chatSession = null;
openChatElements.forEach((element) => {
  element.addEventListener('click', async function () {
    console.log('clicked');
    const user_Email = this.getAttribute('user_Email');
    if(chatSession){
        chatSession = null;
        const myForm = document.getElementById("send-form");
        function removeAllEventListeners(element) {
        const clone = element.cloneNode(true); 
        element.parentNode.replaceChild(clone, element); 
        }
        removeAllEventListeners(myForm);
        const sendBtn = document.getElementById('send-message');
        removeAllEventListeners(sendBtn);

    }
    chatSession =   new ChatEngine('single-chat',user_Email);
  });
});


const newChat = document.getElementById('open-new-chat');
newChat.addEventListener('click',()=>{
    const target = document.querySelector('.chat-user-list');
    target.classList.toggle('hide');

})








