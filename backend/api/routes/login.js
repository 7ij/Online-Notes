const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    User.findOne({
        user_name: req.body.user_name,
        password: req.body.password
    })
        .exec()
        .then(doc => {
            console.log(doc);

            if(doc) {
                const token = jwt.sign({
                    user_name: req.body.user_name,
                    user_id: doc._id,
                }, 
                'MyPrivateKey',
                {
                    expiresIn: "10h"
                });

                res.status(200).json({
                    token: token
                })
            }
            else {
                res.status(404).json({
                    msg: "User not found!!!"
                })
            } 

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
        
});

module.exports = router;