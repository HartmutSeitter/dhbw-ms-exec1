const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {randomBytes} = require('crypto');

const posts = {};

const cors = require('cors'); 
app.use(cors());

app.get('/posts', (req,res) =>{
	console.log('get request received');
    res.send(posts);
});
app.post('/posts', (req,res) => {
	console.log('post request received');
    // 001hs generate a unique id for each new post request
    const id = randomBytes(4).toString('hex');
    // 001hs data from request body into title
    const { title } = req.body;
    // 001hs put the data into the data array with id as key
    posts[id] = {
        id, title 
    };
    res.status(201).send(posts[id]);

});
app.listen(4000, () =>{
	console.log('listening to port 4000');
})