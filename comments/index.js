const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors'); 
app.use(cors());
app.use(bodyParser.json());

const axios = require('axios');

// we want to store the comments in memory 
// and the structure for comments should look like
//    qwer -> {{id:'yxz',content: 'great post'}, {id:'123':content:'great comment'}}
//    asdf -> {{id:'zzz',content: 'next post'}, {id:'456':content:'next great comment'}}
//      qwer and asdf are the ids of the post and yxz,zzz ... are the ids of comments

const commentsByPostId ={};
// route handler for get request
app.get('/posts/:id/comments', (req, res) =>{
    console.log("get request received");
    res.send(commentsByPostId[req.params.id] || []);
});

// route handler for post request
app.post('/posts/:id/comments', async(req, res) => {
    // create a new commentID
    const commentId = randomBytes(4).toString('hex');
    // get the request body and put it into content
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    //push the content into the array based on id
    comments.push ({id:commentId, content});
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});

app.listen(4001, () =>{
    console.log('Listening on 4001');
})