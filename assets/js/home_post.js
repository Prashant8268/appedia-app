{

    let createPost = ()=>{
        let newPostForm = $('#post-form');

        newPostForm.submit((e)=>{
            e.preventDefault(); 
            $.ajax({
                type: 'post',
                url: '/posts/create-post',
                data: newPostForm.serialize(),
                success: (data)=>{
                    console.log(data)
                    let newPost = newPostDom(data.data.post,data.data.username);
                    $('#posts-container').prepend(newPost)

                },
                error: (err)=>{
                    console.log(err, '<--err at homepost.js')
                }
            })
        })
    }

    let newPostDom = (i,username)=>{
        return $(`<div class="post-card" id="post-${i._id}">
           <p><a href="/posts/delete-post/${i._id}">X</a> </p>
        <p>${ username }</p>
        <p> ${ i.content }</p>
        <form action="/comments/post-comment" method="POST" class="comment-form">
            <textarea name="comment" id="" cols="30" rows="2" placeholder="Add comment"></textarea>
            <input type="hidden" name="post"  value="${ i._id }">
            <input type="submit" value="Comment" class="post-button" id="comment-button">
        </form>
        <div class="toggle-comments" container="comments-container-<%= post.id %>">See Comments</div>
        <div id="comments-container-${i._id }">
    </div>
        </div>`)
    }

    let newCommentDom = (comment,user)=>{
        return $(`<li id="comment-${comment._id }">
            <small>
                <a href="/comments/delete-comment/${comment._id }">
                <img src="https://cdn-icons-png.flaticon.com/512/11011/11011600.png" style="height: 15px; width: 8pxpx;">
                </a>
            </small>
            <small>${comment.content } </small>
            <small>${user} </small>
            <div>
                <a href="/likes/toggle?id=${comment._id }&type=Comment" class="like-tag"> 
                <img id="like-logo" src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png" alt="like">
                </a>
                <span>${comment.likes.length }</span>
            </div>
    </li>`)
    }

    let createComment = ()=>{

        let newCommentForms = $('.comment-form');
        newCommentForms.each((index, form) => {
            $(form).submit((e) => {
                e.preventDefault(); 
                let newCommentForm = $(form); // Convert the form to a jQuery object
                $.ajax({
                    type: 'post',
                    url: '/comments/post-comment',
                    data: newCommentForm.serialize(),
                    success: (data) => {
                        let newComment = newCommentDom(data.data.comment, data.data.user);
                        $(`#comments-container-${data.data.postId}`).prepend(newComment);
                    },
                    error: (err) => {
                        console.log(err, '<--err at homepost.js');
                    }
                });
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
    e.addEventListener('click',(event)=>{
        const secondChild = e.querySelector('.check:nth-child(1)');
        secondChild.classList.toggle('hide');

    })
})

//     <button class="delete-post-btn" id="delete-post-<%= post.id %>">
//     <img src="https://cdn-icons-png.flaticon.com/512/2893/2893795.png" alt="options" >
//     <div class="hide">
//         <button><a href="/posts/delete-post/${i._id}">Delete</a></button>
//     </div>
// </button>

}