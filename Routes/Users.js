const joi = require('@hapi/joi')

const schema = joi.object({
  username:joi.string().min(6).max(30).required(),
  email:joi.string().min(6).max(30).email().required(),
  password:joi.string().min(6).required()
})


const UsersGet=(req,res,bcrypt)=>{
    res.send('it is working')
}


const UsersPost = (req,res,bcrypt,knex)=>{

  const {error} = schema.validate(req.body)

  if(error){
    res.status(400).json({message:'please fill the form carefully'})
  }
  else{
    const {username,email,password}=req.body;
    const hash = bcrypt.hashSync(password,10)
  
    knex.transaction(trx =>{
      trx.insert({
        email:email,
       password:hash
      }).into('users')
      .returning('email')
      .then(userEmail =>{
        return trx('register')
        .insert({
          email:userEmail[0],
          username:username,
        })
        .returning('*')
        .then(user=>{
          res.json(user)
        })
  
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
     .catch(err =>{
       res.status(400).json(err)
     })
  }
 
}

 const UserUpload = (req,res,multer) => {
  
    console.log(req.file)
    res.send('sending....')
 }

module.exports={
    UsersGet:UsersGet,
    UsersPost:UsersPost,
    UserUpload:UserUpload
}