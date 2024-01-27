const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Note = require("../models/note");
const NoteList = require("../models/note-list");

router.post("/", (req, res, next) => {
  const note_id = new mongoose.Types.ObjectId();
  NoteList({
    _id: note_id,
    user_id: req.userData.user_id,
    title: req.body.title,
  })
    .save()
    .then((result) => {
      console.log("dbg: ", result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });

  Note({
    _id: note_id,
    user_id: req.userData.user_id,
    title: req.body.title,
    details: req.body.details,
  })
    .save()
    .then((result) => {
      res.status(200).json({
        msg: "Created a new note",
        info: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/", (req, res, next) => {
  NoteList.find({ user_id: req.userData.user_id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        user: req.userData.user_name,
        notes: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  // const token = req.headers.authorization.token.split(" ")[1];
  // // const decoded = jwt.decode(token, 'MyPrivateKey');
  // // console.log(decoded);
});

router.get("/:note_id", (req, res, next) => {
  Note.find({
    _id: req.params.note_id,
    user_id: req.userData.user_id,
  })
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:note_id", (req, res, next) => {
  NoteList.deleteMany({
    _id: req.params.note_id,
    user_id: req.userData.user_id,
  })
    .exec()
    .then((res) => {})
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });

  Note.deleteMany({
    _id: req.params.note_id,
    user_id: req.userData.user_id,
  })
    .exec()
    .then((result) => {
      res.status(204).json({
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:note_id", (req, res, next) => {});

module.exports = router;
