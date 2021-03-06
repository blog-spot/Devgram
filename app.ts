require('dotenv').config

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

declare global{
  namespace mongodb {
    interface data {
      // custom properties
      userBlog?:string;
      array?: string;
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

app.use('/assets/css' , express.static(__dirname + 'public/assets/css'))
app.use('/assets/bootstrap' , express.static(__dirname + 'public/assets/bootstrap'))


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
  const Username = req.user?.displayName
res.render('dummy/dummy', {
  Username: Username
})


})

/* */



app.get('/profile/Writeblogs' , isLoggedIn, (req: Request, res:Response)=> {
  res.render('blogs/blogs')
})

app.post('/blogs/sumbit', isLoggedIn, (req: Request, res:Response)=> {
  var userBlog = req.body.blog;
  var username = req.body.Author

  var blogs_data = {
    "userBlog": userBlog,
    "Username" : username

  }

  db.collection('Blogs').insertOne(blogs_data, function(err , collection) {
    if(err) throw err;
    // if everything passes in mongodb
    console.log("Your blog was Successfully Saved")
  })


})
// deply code setup
// PREV CODE

// app.get('/profile/yourblogs' , isLoggedIn , (req: Request , res: Response)=> {
//   // db collection find.one
//   db.collection('Blogs').find().toArray(function(err,data){
//     if (err) throw err;
//     data?.forEach(element => {

//       console.log(element)

//       var allBlogs = JSON.stringify(element)
//     });
//     res.render('userblogs/userblogs')
//     res.render('userblogs/userblogs', {
//       allBlogs: allBlogs
//     })

//   })



app.get('/profile/Blogs',isLoggedIn,  async (req: Request, res: Response) => {
  const results = await db.collection('Blogs').find().toArray()
  // console.log(results)
  res.render('userblogs/userblogs', { items: results })
})

// app.get('/profile/yourblogs', isLoggedIn, async (req: Request , res: Response) => {
//   // query the database to fetch all the documents
//   // TODO: don't forget error handling
//   const result = await db.collection('Blogs').find()
//   // result is basically an "Array" of "Documents (objects)"

//   // once you fetched the documents
//   // you reshape its structure however you want
//   // its called transforming
//   const myArray = result.map(document => JSON.stringify(document))
//   console.log(myArray)

//   // Then you can pass the new structure to the template engine
//   res.render('userblogs/userblogs' , {
//     Allblogs: myArray
//   })
// })


//Logout
app.get('/logout',(req,res)=>{
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback??? bulletproof!
   });
})
// app.post functions are

// app.get('/login' , (req: Request, res: Response) => {
//     res.render('login/login.ejs')
// })




app.listen(PORT, ():void => {
    console.log(`Server Running here ???  https://localhost:${PORT}`);
  });
