const express = require('express');
const colors = require('colors');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))
// require route
const authRoute = require('./Routes/authRoute');
const manageRoute = require('./Routes/manageRoute');
// use route
app.use('/auth',authRoute);
app.use('/manage',manageRoute);
// call front end
app.use(express.static('client/build'));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

const PORT = 5000;
app.listen(PORT,console.log(`Server is running in ${PORT}...`.red.bgGreen))