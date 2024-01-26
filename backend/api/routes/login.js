const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', (req, res, next) => {
    User.findOne({
        user_name: req.body.user_name,
        password: req.body.password
    })
        .exec()
        .then(doc => {
            console.log(doc);

            if(doc) {
                res.status(200).json({
                    msg: "Logged In Succesfully"
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