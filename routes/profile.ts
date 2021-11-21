import express, {Request , Response, Application} from 'express';

var app = express();

function profile(){
    app.get('/profile' , (req:Request, res:Response) => {
        res.send("WORKING")
    })
    
}

profile();

module.exports = profile;