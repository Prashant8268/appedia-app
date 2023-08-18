{
   console.log('script loaddded h yr ')

    let createPost = ()=>{
        let newPostForm = $('#post-form');

        newPostForm.submit((e)=>{
            e.preventDefault(); 
            $.ajax({
                type: 'post',
                url: '/create-post',
                data: newPostForm.serialize(),
                success: (data)=>{
                    console.log(data);

                },
                error: (err)=>{
                    console.log(err, '<--err at homepost.js')
                }
            })
        })
    }
    createPost();
}