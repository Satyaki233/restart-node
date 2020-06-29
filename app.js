const express =require('express')
const bcrypt = require('bcrypt')
const pg = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan=require('morgan');

const config = require('./config')
 
// const storage= multer.diskStorage({
//    destination: function(req,file,cb){
//        cb(null,'./upload/')
//    },
//    filename: function(req,file,cb){
//          cb(null, file.originalname )
//    }

// })

// const fileFilter =(req,file,cb)=>{
//   if(file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
//     cb(null,true);
//   }
//   else{
//     cb(null,false);
//   }
// }

 

// const upload = multer({
//                storage:storage,
//                limits : {
//                 fieldSize: 1024 * 1024 * 5
//               },
//                 fileFilter: fileFilter
              
//               })


////// Declaring S3 credentials ----------------



config.lil( 123)




const fs= require('fs')


const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host :'localhost',
      user : 'postgres',
      password :'test',
      database :'medica'
    }
  });

  config.table(knex)
  const upload = config.upload

  


app=express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'));





const Users= require('./Routes/Users')



app.get('/',(req,res)=>{
    res.send('ok')
})

app.get('/Users',(req,res)=>{Users.UsersGet(req,res,bcrypt)})
app.post('/Users',(req,res)=>{Users.UsersPost(req,res,bcrypt,knex)})
app.post('/Users/Upload',upload.single('img'),(req,res)=>{Users.UserUpload(req,res)})

app.listen(4000,()=>{
    console.log('app is running on port 4000')
})