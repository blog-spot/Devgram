import express, {Request,Response,Application} from 'express';
import * as fs from 'fs';
var bodyParser = require('body-parser');
const app:Application = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
var sql = require("mssql");

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

// mysql test connection

var dbConfig = {
    server: "dev-gram.database.windows.net", // Use your SQL server name
    database: "users-api", // Database to connect to
    user: "Udhay", // Use your username
    password: "cisco123!@#", // Use your password
    port: 1433,
    // Since we're on Windows Azure, we need to set the following options
    options: {
          encrypt: true
      }
   };

   function Conncet(){
       
 var conn = new sql.ConnectionPool(dbConfig);

 conn.connect(
     function (err:any) { 
     if (err) { 
         console.log("!!! Cannot connect !!! Error:");
         throw err;
     }
     else
     {
        console.log("Connection established.");
     }
 });
 

   }

Conncet();





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

app.get()



app.listen(PORT, ():void => {
    console.log(`Server Running here ⚡  https://localhost:${PORT}`);
  });