import express, {Request,Response,Application} from 'express';
import * as fs from 'fs';
var bodyParser = require('body-parser');
const app:Application = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.set('view engine' , 'ejs')

// setting up static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/fonts' , express.static(__dirname + 'public/fonts'))
app.use('/img' , express.static(__dirname + 'public/img'))
app.use('/bootstrap' , express.static(__dirname + 'public/bootstrap'))





app.get('/' , (req: Request, res: Response) => {
    res.render('index/index')
})

app.listen(PORT, ():void => {
    console.log(`Server Running here ⚡  https://localhost:${PORT}`);
  });