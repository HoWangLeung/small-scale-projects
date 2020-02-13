//inbuilt
// const fs = require('fs');

// modules npm install
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const AuthChallenger = require('./AuthChallenger')
const NoteService = require('./services/NoteService');
// const path = require('path');
const hb = require('express-handlebars');

//knex setup
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig)

// middlewares
app.engine('handlebars', hb({defaultLayout:'main'}));
app.set('view engine','handlebars')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
const config = require('./stores/config.json')['development']
//Router
const NoteRouter = require('./routers/NoteRouter');
//Service
const noteService = new NoteService(knex);
//Serve static file
app.use('/', express.static('public'))

//Use basic auth
app.use(basicAuth({
    authorizer: AuthChallenger(knex),
    challenge: true,
    authorizeAsync: true,
    realm: 'Note Taking Application With Knex'
}));


//GET data from api
app.use('/api/notes', new NoteRouter(noteService).router());

// Render html
app.get('/',(req,res)=>{
    res.render("index");
})

app.listen(config.port, ()=> console.log(`Note Taking APP W3 listening at port ${config.port}`)
);
module.exports = app;