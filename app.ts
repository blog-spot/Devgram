import express, {Request,Response,Application} from 'express';
import * as fs from 'fs';
var bodyParser = require('body-parser');
const app:Application = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
var sql = require("mssql");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine' , 'ejs')

// setting up static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/fonts' , express.static(__dirname + 'public/fonts'))
app.use('/img' , express.static(__dirname + 'public/img'))
app.use('/bootstrap' , express.static(__dirname + 'public/bootstrap'))









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




app.get('/register' , (req: Request, res: Response) => {
    res.render('register/register')
    var email = req.body.email
    console.log(email)
})

// app.post functions are

app.get('/login' , (req: Request, res: Response) => {
    res.render('login/login.ejs')
})


app.listen(PORT, ():void => {
    console.log(`Server Running here ⚡  https://localhost:${PORT}`);
  });