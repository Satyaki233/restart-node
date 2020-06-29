const lil =(r) =>{
    console.log('it is a test' + r)
}

////Aws -s3 MANGEMENTS----------------

const multer = require('multer')
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );

const path = require( 'path' );
const url = require('url');
require('dotenv').config()

const s3 = new aws.S3({
    accessKeyId: process.env.ACCSESS_kEY_ID,
    secretAccessKey: process.env.SECRET_KEY_ID,
    Bucket: process.env.BUCKET
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




//////////////Knex tables---------------------------


const table = (knex) =>{

    //// Users table
    
  knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('users', function(t) {
        t.increments('id').primary();
        t.string('email', 50);
        t.string('password',255);
       
      });
    }
  });

  ///// Register table

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



}

const rawData = (multer,multerS3) =>{

}

module.exports = {
    table : table,
    lil : lil,
    upload : upload
}