"use strict";

var mongodb = require("mongodb").MongoClient;

var express = require("express");

var promise = require("promise");

var _require = require("util"),
    isNull = _require.isNull;

var _require2 = require("mongodb"),
    ObjectID = _require2.ObjectID;

var moment = require('moment');

require('mongodb-moment')(moment);

var app = express.Router();
var uri = "mongodb://test:admin@clustertest-shard-00-00.jipjc.mongodb.net:27017,clustertest-shard-00-01.jipjc.mongodb.net:27017,clustertest-shard-00-02.jipjc.mongodb.net:27017/workshop?ssl=true&replicaSet=atlas-14m7p7-shard-0&authSource=admin&retryWrites=true&w=majority";
app.post('/deposit', function (req, res) {
  var _req$body = req.body,
      _id = _req$body._id,
      balance = _req$body.balance;
  mongodb.connect(uri, function (err, db) {
    if (err) throw err;
    var data = db.db('workshop');
    var newValue = {
      $set: {
        balance: balance
      }
    };
    data.collection('auth').updateOne({
      _id: ObjectID(_id)
    }, newValue, function (err, resp) {
      if (err) throw err;
      console.log(resp);
      db.close();
    });
  });
});
app.get('/lockerlist', function (req, res) {
  mongodb.connect(uri, function (err, db) {
    if (err) throw err;
    var data = db.db('workshop');
    data.collection('locker').find({}).toArray(function (err, result) {
      res.json(result);
      db.close();
    });
  });
});
app.post('/booking', function (req, res) {
  var _req$body2 = req.body,
      no = _req$body2.no,
      _id = _req$body2._id,
      sdate = _req$body2.sdate,
      isbook = _req$body2.isbook;
  console.log(">>>", sdate);
  mongodb.connect(uri, function (err, db) {
    if (err) throw err;
    var data = db.db('workshop'); // start_date:sdate,no:no

    var newValue = {
      $set: {
        start_date: new Date(sdate)
      }
    };
    var book = new promise(function (resolve, reject) {
      data.collection('auth').updateOne({
        _id: ObjectID(_id)
      }, newValue, function (err, resp) {
        // console.log(resp)
        console.log(new Date(sdate).toLocaleString());
      });
    });
  });
});
app.get('/date', function (req, res) {
  mongodb.connect(uri, function (err, db) {
    if (err) throw err;
    var data = db.db('workshop');
    data.collection('auth').findOne({
      username: 'admin'
    }, function (err, result) {
      res.json({
        date: new Date(result.start_date).toLocaleString()
      });
      db.close();
    });
  });
});
module.exports = app;