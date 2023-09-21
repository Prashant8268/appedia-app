

{

    // this is code for notification
    const notification =(message)=>{
        const noti = document.createElement('div');
        noti.id='notification';
        noti.innerHTML =message;
        const body = document.querySelector('body');
        body.prepend(noti);
        setTimeout(() => {
            // Apply the animation by changing the CSS properties
            noti.style.opacity = '0';
            setTimeout(() => {
              noti.remove();
            }, 700); // 500 milliseconds (0.5 seconds) matches the animation duration
          }, 2000);

    }


    let deletePost = document.querySelectorAll('.delete-post-btn');
    function refreshPosts(){
        deletePost = document.querySelectorAll('.delete-post-btn');
        console.log(deletePost);
     }

    
    let createPost = ()=>{
        let newPostForm = $('#post-form');
        newPostForm.submit(async(e)=>{
            e.preventDefault(); 
            await $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: (data)=>{
                    console.log(data,'this is data ')
                    let newPost = newPostDom(data.data.post,data.data.username,data.data.avatar);
                    $('#posts-container').prepend(newPost);
                    refreshPosts();
                    check();
                    createComment();
                    refreshToggleComment();
                    toggleLikes();
                    notification('Posted');
 

                },
                error: (err)=>{
                    console.log(err, '<--err at homepost.js')
                }
            });
            newPostForm[0].reset();
        });

    }

    let newPostDom = (i,username,avatar)=>{
        return $(`<div class="post-card"  id="post-${i._id}">
        <div>
            <img src="${avatar}"  id="user-avatar">
            <span id="user-name">${username}</span>
            <button class="delete-post-btn" postId=${i._id}>
                Delete
            </button>
        </div>
        <div style="color: black; ">
            <p  >${i.content}</p>
                <a href="/likes/toggle?id=${i._id}&type=Post" class="like-tag"> 
                    <img id="like-logo" src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="like">
                </a>
                <span style="font-size: 1rem; font-family: 'Courier New', Courier, monospace;">
                    <span style="font-size: 1rem; font-family: 'Sorts Mill Goudy', serif;" id="post-like-${i._id}">
                        No
                    </span>
                Likes
                </span>
                <form action="/comments/post-comment" method="POST" class="comment-form" id= "comment-form-${i._id}" >
                    <textarea name="comment" id="" cols="30" rows="2" placeholder="Add comment"></textarea>
                    <input type="hidden" name="post"  value="${i._id}">
                    <input type="submit" value="Comment" class="post-button" id="comment-button">
                </form>
        </div>
        <div class="toggle-comments" container="comments-container-${i._id}">See Comments</div>
        <div id="comments-container-${i._id}" class="hide">
        </div>
    </div>`)
    }

    let newCommentDom = (comment,user)=>{
        return $(`
        <li id="comment-${comment._id}" class="single-comment">
        <div>${user}</div>
        <div style="color: black;" >
             <small style="color: black;">${comment.content}</small>
                <a href="/likes/toggle?id=${comment._id}&type=Comment" class="like-tag"> 
                <img id="like-logo-C" src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="like">
                </a>
                <span>
                    <span style="font-size: 1.2rem;" id="comment-like-${comment._id}">
                    No 
                    </span>Likes
                </span>  
                     <small>
                         <button class="delete-comment" href="/comments/delete-comment/${comment._id}"  >
                         <img src="https://cdn-icons-png.flaticon.com/128/484/484560.png" style="height: 15px; width: 10pxpx;">
                         </button>
                     </small>
         </div>                                                                        
     </li>`)
    }



    let createComment = ()=>{
     let newCommentForms = $('.comment-form');
        newCommentForms.each((index, form) => {
            $(form).submit(async(e) => {
                e.preventDefault(); 
                let newCommentForm = $(form); // Convert the form to a jQuery object
                await $.ajax({
                    type: 'post',
                    url: '/comments/post-comment',
                    data: newCommentForm.serialize(),
                    success: (data) => {
                        let newComment = newCommentDom(data.data.comment, data.data.user);
                        $(`#comments-container-${data.data.postId}`).prepend(newComment);
                        const postId = data.data.postId;
                        const containerSelector = `[container="comments-container-${postId}"]`;
                        const commentsContainer = document.querySelector(containerSelector);
                        commentsContainer.innerHTML= 'Hide comments';
                        const temp = document.getElementById(`#comments-container-${postId}`);
                       // Remove a specific class from the div using jQuery
                        $(`#comments-container-${postId}`).removeClass("hide");
                        check2();
                        refreshToggleComment();
                        toggleLikes();
                        notification('Commented');
                        
                    },
                    error: (err) => {
                        console.log(err, '<--err at homepost.js');
                    }
                });
                newCommentForm[0].reset();
                
            });
            
        });

    }
    createComment();
    createPost();
    let toggleComment = document.querySelectorAll('.toggle-comments');

    function refreshToggleComment(){
        toggleComment = document.querySelectorAll('.toggle-comments');
        toggleComment.forEach((e)=>{
            e.addEventListener('click',(event)=>{
                if(event.target.innerHTML=='See Comments'){
                   event.target.innerHTML= 'Hide Comments'
                }
                else{
                    event.target.innerHTML = 'See Comments'
                }
                const commentContainer = document.getElementById(event.target.getAttribute('container'));
                commentContainer.classList.toggle('hide');
         
            })
        })

    }
    refreshToggleComment();



 function check() { deletePost.forEach((e)=>{
    e.addEventListener('click',async()=>{
        const postId = e.getAttribute('postId');
       await $.ajax({
            type: 'get',
            url: `/posts/delete-post/${postId}`,
            success: (data)=>{
                const post = document.getElementById(`post-${postId}`);
                post.parentNode.removeChild(post);
                notification('Post Deleted');
                
            },
            error: (err)=>{
                console.log(err, '<--err at homepost.js')
            }
        })
    })
    })
}
check();



// for deleteing a comment using async



function check2(){
    let deleteComment = document.querySelectorAll('.delete-comment');
    deleteComment.forEach((link)=>{
    link.addEventListener('click',async(event)=>{
        event.preventDefault();
        const href = link.getAttribute('href');
        await $.ajax({
            type: 'get',
            url: href,
            success: (data)=>{
                const post = document.getElementById(`comment-${data.comment}`);
                post.parentNode.removeChild(post);
                notification('Comment deleted')

                
            },
            error: (err)=>{
                console.log(err, '<--err at homepost.js')
            }
        })
    })
    })
}

check2();

// ajax code for toggle likes

const toggleLikes = ()=>{
    let likeableItems = document.querySelectorAll('.like-tag');
    likeableItems.forEach((item)=>{
        item.addEventListener('click',async(event)=>{
            event.preventDefault();
            const href = item.getAttribute('href');;
            await $.ajax({
                type: 'get',
                url: href,
                success: (data)=>{
                    let likeContainer;
                    if(data.type=='Post'){

                        likeContainer = document.getElementById(`post-like-${data.id}`);

                    }
                    else{
                        likeContainer=document.getElementById(`comment-like-${data.id}`);

                    }
                    if(data.length==0){
                        likeContainer.innerHTML='No';
                        return ;
                    }
                    
                        likeContainer.innerHTML= data.length;
                        notification('Liked');
                    



                    
                },
                error: (err)=>{
                    console.log(err, '<--err at homepost.js')
                }
            })


        })
    })
}

toggleLikes();




// for displaying  friends request

const sideElement = document.querySelectorAll('.side-element');
sideElement.forEach((item)=>{
    item.addEventListener('click',()=>{
        const requestSection = item.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
        if(requestSection.style.height==0){
            requestSection.style.height  = 'auto';
            requestSection.style.width = '9rem';
            requestSection.style.display='block';
        }
        else{
            requestSection.style.display="none";
            requestSection.style.height="";
            requestSection.style.width="";
        };
    
    });
    
})

}


