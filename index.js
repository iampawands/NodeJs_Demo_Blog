var express = require("express");
var mongoose = require('mongoose');
var Post = require('./models/Post');
var bodyparser = require('body-parser');
var fileUpload = require('express-fileupload');
var path = require('path');

//mongoose.connect('mongodb://localhost:27017/thegeekypawan',{ useNewUrlParser: true });
mongoose.connect('mongodb+srv://root:admin@postblog-kmzvw.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });


var app = express();
app.use(fileUpload());
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
//app.set('views',__dirname + '/views');

//routes
//########################

app.get('/',(req,res)=>{
  Post.find({},function(err,posts){
    if(err){
      console.log(err);
    }
    else{
        res.render("index",{posts:posts});
    }
  });

});

app.get('/about',(req,res)=>{
  res.render("about");
});

app.get('/contact',(req,res)=>{
  res.render("contact");
});

app.get('/posts',(req,res)=>{
  Post.find({},function(err,posts){
    if(err){
      console.log(err);
    }
    else{
        res.render("show",{posts:posts});
    }
  });
});

app.get('/posts/new',(req,res)=>{
  res.render('create');
});

// app.post('/posts/store',(req,res)=>{
//     var uname = req.body.username;
//     var title = req.body.title;
//     var description =req.body.description;
//     var content = req.body.content;
//     var image =  req.files;
//     console.log(req);
//
//     Post.create({username:uname,title:title,description:description,
//       content:content,image:image.name},(err,post)=>{
//       if(err){
//         console.log(error);
//       }
//       else{
//                 res.redirect('/');
//       }
//     });
// });
app.post("/posts/store", (req, res) => {
    const {
        image
    } = req.files

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            res.redirect('/');
        });
    })
});


app.get('/posts/:id',function(req,res){
    Post.findById(req.params.id,(err,post)=>{
      if(err){
        console.log(err);
        console.log(req.params.id);
      }
      else{
        res.render('post',{post:post});
      }
    });
});


//########################


app.listen(6600,()=>{
    console.log("server started listening on port 6600..........");
});
