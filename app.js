const express =require('express')
const bcrypt = require('bcrypt')
const pg = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan=require('morgan');
const multer = require('multer')
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );

const path = require( 'path' );
const url = require('url');
 
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

const s3 = new aws.S3({
  accessKeyId: 'AKIAVBZF43G6RXC6JRFR  ',
  secretAccessKey: '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',
  Bucket: 'satyaki-new-bucket2'
 })

 ///// Creating Upload function

 const upload = multer({
  storage: multerS3({
   s3: s3,
   bucket: 'satyaki-new-bucket2',
   acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, 'pictures/' +  path.basename( file.originalname, path.extname( file.originalname ) ) )
   }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ){
   checkFileType( file, cb );
  }
 })

 ///// Creating CheckfileType Function--------
 function checkFileType( file, cb ){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  // Check mime
  const mimetype = filetypes.test( file.mimetype );if( mimetype && extname ){
   return cb( null, true );
  } else {
   cb( 'Error: Images Only!' );
  }
 }

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


  knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('users', function(t) {
        t.increments('id').primary();
        t.string('email', 50);
        t.string('password',255);
       
      });
    }
  });

  knex.schema.hasTable('register').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('register', function(t) {
        t.increments('id').primary();
        t.string('username', 30);
        t.string('email', 50);
        t.timestamp('joined').defaultTo(knex.fn.now());
      });
    }
  });



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
app.post('/Users/Upload',upload.single('img'),(req,res)=>{Users.UserUpload(req,res,multer)})

app.listen(4000,()=>{
    console.log('app is running on port 4000')
})