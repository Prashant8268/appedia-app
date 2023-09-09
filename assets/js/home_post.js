{

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
            <button class="delete-post-btn">
                <a href="/posts/delete-post/${i._id}">Delete</a>
            </button>
        </div>
        <div style="color: black; ">
            <p  >${i.content}</p>
                <a href="/likes/toggle?id=${i._id}&type=Post" class="like-tag"> 
                    <img id="like-logo" src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="like">
                </a>
            <span>  <span style="font-size: 1.5rem;">${i.likes.length}</span>   Likes</span>
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
        return $(`<li id="comment-${comment._id}" class="single-comment">
        <div> ${user}</div>
        <div style="color: black;" >
             <small style="color: black;"> ${comment.content}</small> 
                  <a href="/likes/toggle?id=${comment._id}&type=Comment" class="like-tag"> 
                 <img id="like-logo-C" src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="like">
                 </a>
                 <span><span style="font-size: 1.2rem;">${comment.likes.length}</span> Likes</span>
                     <small>
                         <a href="/comments/delete-comment/${comment._id}" class="delete-comment>
                         <img src="https://cdn-icons-png.flaticon.com/128/484/484560.png" style="height: 15px; width: 10pxpx;">
                         </a>
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
    const toggleComment = document.querySelectorAll('.toggle-comments');
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


const deletePost = document.querySelectorAll('.delete-post-btn');
deletePost.forEach((e)=>{
    e.addEventListener('click',async()=>{

        const postId = e.getAttribute('postId');
       await $.ajax({
            type: 'get',
            url: `/posts/delete-post/${postId}`,
            success: (data)=>{

                const post = document.getElementById(`post-${postId}`);
                post.parentNode.removeChild(post);
                
            },
            error: (err)=>{
                console.log(err, '<--err at homepost.js')
            }
        })
    })
    })

// for deleteing a comment using async

const deleteComment = document.querySelectorAll('.delete-comment');
deleteComment.forEach((e)=>{
    e.addEventListener('click',async()=>{
        e.preventDefault();
        console.log('clicked');
        const href = e.getAttribute('href');
        console.log('href', href);
        return ;
       await $.ajax({
            type: 'get',
            url: href,
            success: (data)=>{
                const post = document.getElementById(`comment-`);
                post.parentNode.removeChild(post);
                
            },
            error: (err)=>{
                console.log(err, '<--err at homepost.js')
            }
        })
    })
    })


}


