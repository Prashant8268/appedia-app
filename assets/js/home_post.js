{

    let createPost = ()=>{
        let newPostForm = $('#post-form');

        newPostForm.submit((e)=>{
            e.preventDefault(); 
            $.ajax({
                type: 'post',
                url: '/create-post',
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
           <p><a href="/delete-post/${i._id}">X</a> </p>
        <p>${ username }</p>
        <p> ${ i.content }</p>
        <form action="/post-comment" method="POST" class="comment-form">
            <textarea name="comment" id="" cols="30" rows="2" placeholder="Add comment"></textarea>
            <input type="hidden" name="post"  value="${ i._id }">
            <input type="submit" value="Comment" class="post-button" id="comment-button">
        </form>
        <div id="comments-container-${i._id }">
    </div>
        </div>`)
    }

    let newCommentDom = (i,user)=>{
        return $(`<li id="comment-${ i._id  }">
         <small><a href="/delete-comment/${i._id }">D</a></small>
         <p>${ i.content }</p>
         <p>${user}</p>
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
                    url: '/post-comment',
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
}