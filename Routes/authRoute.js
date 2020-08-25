const mongodb = require("mongodb").MongoClient;
const express = require("express");
const promise = require("promise");
const { isNull } = require("util");
const { ObjectID } = require("mongodb");

const app = express.Router();
const uri =
  "mongodb://test:admin@clustertest-shard-00-00.jipjc.mongodb.net:27017,clustertest-shard-00-01.jipjc.mongodb.net:27017,clustertest-shard-00-02.jipjc.mongodb.net:27017/workshop?ssl=true&replicaSet=atlas-14m7p7-shard-0&authSource=admin&retryWrites=true&w=majority";

  // Sign In API
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  mongodb.connect(uri, (err, db) => {
    if (err) throw err;
    let data = db.db("workshop");
    // Find user in database.
    data
      .collection("auth")
      .findOne({ username: username, password: password }, (err, result) => {
        if (err) throw err;
        // if user exist will return authentication true and user id
        if (!isNull(result)) {
          res.json({
            auth: true,
            user: result._id,
          });
        } else {
          res.json({
            auth: false,
          });
        }
        db.close();
      });
  });
});
// Sign Up API
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  mongodb.connect(uri, (err, db) => {
    if (err) throw err;
    let data = db.db("workshop");
    let reg = new promise((resolve, reject) => {
      // find username
      data.collection("auth").findOne({ username: username }, (err, resp) => {
        if (err) reject(err);
        resolve(resp);
      });
    })
      .then((resp) => {
        // if username does not exist it will sign up and return authentication to true
        if (isNull(resp)) {
          data.collection("auth").insertOne(
            {
              username: username,
              password: password,
              start_date: new Date(0),
              no: 0,
              locker_size:'',
            },
            (err, result) => {
              if (err) throw err;
            }
          );
        } else {
          res.json({
            auth: false,
          });
        }
      })
      .then(() => {
        data.collection("auth").findOne({ username: username }, (err, resp) => {
          if (err) reject(err);
          res.json({
            auth: true,
            user: resp._id,
          });
        });
        db.close();
      });
  });
});

// GET USER API
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  mongodb.connect(uri,(err,db)=>{ 
    let data = db.db('workshop');
    // find user and return user data
    data.collection('auth').findOne({_id:ObjectID(id)},(err,result)=>{
      res.json(result);
      db.close();
    })
  })

});

module.exports = app;
