const fs = require('fs')
const express = require('express');
const hbs = require("express-handlebars");
const app = express();
const path = require('path')
const OrderService = require('./service/OrderService');
const OrderRouter = require('./routers/OrderRouter')
const bodyParser = require('body-parser')
const AuthChallenger = require('./AuthChallenger.js')
const basicAuth = require('express-basic-auth');
//require KNEX
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig)

//template engine
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const config = require('./stores/config.json')['development'];
//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static("public"));

//basic-auth
app.use(basicAuth({
    authorizer: AuthChallenger(knex),
    challenge: true,
    authorizeAsync: true,
    realm: 'Restaurant Application With Knex'
}));


//routing
const orderService = new OrderService(knex);


console.log("LINE34, app.js");
console.log(path.join(__dirname, config.orders));
app.use('/api/orders', new OrderRouter(orderService).router());

app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/pizza',(req,res)=>{
    res.render("pizzaIndex");
})
app.get('/about',(req,res)=>{
    res.render("about");
})


app.get('/cart',(req,res)=>{
    res.render("cart");
})

app.get('/contact',(req,res)=>{
    res.render("contact");
})
app.get('/login',(req,res)=>{
    res.render("logSign");
})

app.get('/cart/checkout',(req,res)=>{
    res.render("checkout");
})



app.post('/')


app.listen(config.port, ()=> console.log('listening at 8080')
)

module.exports = app;