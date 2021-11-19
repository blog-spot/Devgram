import express, {Request , Response, Application} from 'express';

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        return req;
      next();
    } else {
        res.status(401).send('Not Logged In');
      }
    }


    module.exports = isLoggedIn
