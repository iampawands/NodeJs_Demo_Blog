mongoose = require('mongoose');

postSchema  = new mongoose.Schema({
  username : String,
  title : String,
  description : String,
  content : String,
  image : String,
  createdAt:{
    	type:Date,
    	default:new Date()
    }
});

Post = mongoose.model('Post',postSchema);

module.exports = Post;
