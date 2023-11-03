const express = require('express');
const hbs = require('hbs');
const path = require('path');
const User = require("./models/usermessage");
require("./db/conn");

const  app = express();
const port = process.env.PORT || 3000;

const staticpath = path.join(__dirname,'../public');
const templatepath = path.join(__dirname,'../templates/views');
const partialpath = path.join(__dirname,'../templates/partials');



app.use('/css', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname,"../node_modules/bootstrap/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));

app.set('view engine','hbs');
app.set('views', templatepath);
hbs.registerPartials(partialpath);


app.get("/",(req,res)=>{
    res.render("index");
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/service',(req,res)=>{
    res.render('service');
})

app.get('/gallary',(req,res)=>{
    res.render('gallary');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
    app.post('/contact',async(req,res)=>{
        try{
            //res.send(req.body);
            const userData = new User(req.body);
             await userData.save();
             res.status(201).render("index");
        }catch(err){
            res.status(500).send(err);
        }
    })

})

/*app.post('/contact',async(req,res)=>{
    try{
        res.send(req.body);
    }catch(err){
        res.status(500).send(err);
    }
})*/

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})