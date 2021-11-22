declare global {
  namespace Express {
      interface User {
          // your custom properties
          user?:string;
          displayName?:string;
          name?: string;
          giveName?: string;
      }
  }
}

import express, {Request,Response,Application, NextFunction} from 'express';
import * as fs from 'fs';
var bodyParser = require('body-parser');
const app:Application = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const isLoggedIn = require('./Middleware/middleWare')
require ('./auth')
import passport from 'passport';
import mongoose from 'mongoose';

// mongooseconncetion 

mongoose.connect('mongodb+srv://Udhay:udhay123@devgram.x4ikw.mongodb.net/Devgram?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  


import session from 'express-session';

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine' , 'ejs')



// setting up static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/fonts' , express.static(__dirname + 'public/fonts'))
app.use('/img' , express.static(__dirname + 'public/img'))
app.use('/bootstrap' , express.static(__dirname + 'public/bootstrap'))


app.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/error', (req, res) => res.send('Unknown Error'))
app.get('/api/google/account', passport.authenticate('google', { failureRedirect: '/auth/error' }),
  function(req:Request, res:Response) {
    res.redirect('/profile');
  }
);




app.get('/' , (req: Request, res: Response) => {
    axios.get("https://devgramapi.herokuapp.com/mainpage")
    .then(function (response: any){
        const headers = response.data[0].Mainheading
        const subheaders = response.data[0].subMain
        const waitlist = response.data[1].headers
        // console.log(headers)
        res.render('index/index', {
            headers: headers,
            subheaders: subheaders,
            waitlist: waitlist,

        })
    })
})

// export class CRequest extends Request {
//   user?: string;
//   //add stuff to constructor etc

// }



app.get(`/profile` ,isLoggedIn, (req: Request, res: Response)=> {
  fs.readFile('./views/dummy.ejs' , function(err,data){
    res.writeHead(200, {'Context-type': 'text/html'});
    res.write(data);
    return res.end();
})


  res.send(`welcome ${req.user?.displayName}`)
  
  
})

app.get('/profile/yourblogs' , isLoggedIn, (req: Request, res: Response)=> {
  fs.readFile('./views/blogs/blogs.ejs' , function(err,data){
    res.writeHead(200, {'Context-type': 'text/html'});
    res.write(data);
    return res.end();
  })
  res.send("UR BLOGS")



  var blogs = req.body.blogs

})

app.get('/profile/Writeblogs' , isLoggedIn, (req: Request, res:Response)=> {
  res.send("WRITE BLOGS")
})

//Logout
app.get('/logout',(req,res)=>{
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
   });
})
// app.post functions are

// app.get('/login' , (req: Request, res: Response) => {
//     res.render('login/login.ejs')
// })


app.listen(PORT, ():void => {
    console.log(`Server Running here ⚡  https://localhost:${PORT}`);
  });
