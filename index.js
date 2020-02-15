const express = require('express');
const app = express();
const listeningPort = process.env.PORT || 3000;
const repos= require('./routes/repos');
app.use('/githubRepo',repos);



app.listen(listeningPort, ()=> console.log(`Listening on port ${listeningPort}...`));