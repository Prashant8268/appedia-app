module.exports.home =(req,res)=>{


    return res.render('./home.ejs',{
        title:"Codeial",
        layout:'second.ejs'
    });


}