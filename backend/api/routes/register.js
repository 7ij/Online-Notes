const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/', (req, res, next) => {
    User.findOne({user_name: req.body.user_name}).exec()
        .then(doc => {
            if(doc) {
                res.status(409).json({
                    msg: "User_name already exists"
                })
            }
            else {
                User({
                    _id: new mongoose.Types.ObjectId(),
                    user_name: req.body.user_name,
                    password: req.body.password
                })
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            msg: 'Registration Successful'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;