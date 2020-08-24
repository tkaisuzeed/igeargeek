const mongodb = require("mongodb").MongoClient;
const express = require("express");
const promise = require("promise");
const { isNull } = require("util");
const { ObjectID } = require("mongodb");
const moment = require('moment');
require('mongodb-moment')(moment);
const app = express.Router();
const uri =
  "mongodb://test:admin@clustertest-shard-00-00.jipjc.mongodb.net:27017,clustertest-shard-00-01.jipjc.mongodb.net:27017,clustertest-shard-00-02.jipjc.mongodb.net:27017/workshop?ssl=true&replicaSet=atlas-14m7p7-shard-0&authSource=admin&retryWrites=true&w=majority";

  // deposit API
  app.post('/deposit',(req,res)=>{
      const {_id,balance} = req.body;
      
      mongodb.connect(uri,(err,db)=>{
          if(err)throw err;
          let data = db.db('workshop');
          const newValue = { $set: {balance:balance } };
          data.collection('auth').updateOne({_id:ObjectID(_id)},newValue,(err,result)=>{
            if(err)throw err;
            console.log(result)
            db.close();
          })
      })
  })
  
  // return data of locker API
  app.get('/lockerlist',(req,res)=>{

    mongodb.connect(uri,(err,db)=>{
        if(err)throw err;
        let data = db.db('workshop');
        data.collection('locker').find({}).toArray((err,result)=>{
            res.json(result);
            db.close();
        })
    })
  })

  // Booking API
  app.post('/booking',(req,res)=>{

    const {no,_id,sdate,isbook,size} = req.body;
    
    mongodb.connect(uri,(err,db)=>{
      if(err)throw err;
      let data = db.db('workshop');
      
      const newUserValue = { $set: {start_date:new Date(sdate),no:no,locker_size:size} };
      // update data to user(start date,locker number and locker size)
      data.collection('auth').updateOne({_id:ObjectID(_id)},newUserValue,(err,resp)=>{
        console.log(resp);
      })
      
      const newLockerValue = { $set: {isbook:isbook }};
      // update data to locker(isbooking)
      data.collection('locker').updateOne({no:no},newLockerValue,(err,result)=>{
        console.log(result);
      })
    })
  })
  
  // purchase API
  app.post('/purchase',(req,res)=>{
    const {_id,no,balance} = req.body;

    mongodb.connect(uri,(err,db)=>{
      if(err)throw err;
      let data = db.db('workshop');
      // update data to locker(isbooking)
      const newLockerValue = {$set:{isbook:false}};
      data.collection('locker').updateOne({no:no},newLockerValue,(err,result)=>{
        console.log(result);
      })
      // update data to user(locker number,start date, locker size and balance)
      const newUserValue = {$set:{no:0,start_date:0,locker_size:'',balance:balance}};
      data.collection('auth').updateOne({_id:ObjectID(_id)},newUserValue,(err,result)=>{
        console.log(result);
      })
      
    })
  })

  module.exports = app;
