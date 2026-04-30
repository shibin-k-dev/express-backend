import DataSchema from './models/models.js'
import UserSchema from './models/user.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign} = pkg




export async function AddData(req,res) {
    const {title,price,image} = req.body
    const userid =req.user.UserID
    if(!(title&&price&&image)){
        res.status(500).send({msg:"invalid input"})
    }
    else{
        await  DataSchema.create({title,price,image,userid}).then(()=>{
            res.status(200).send({msg:"success"})
        }).catch((err)=>{
            
        res.status(500).send({msg:"error"})
    })
}
}

export async function GetData(req,res) {

     const data =await DataSchema.find()
     res.status(200).send(data)
}

export async function GetSingleData(req,res) {
    const {id} = req.params 
    
    await DataSchema.findOne({_id:id}).then((data)=>{
        res.status(200).send(data)

    }).catch((err)=>{
        res.status(500).send({error:err})
    })
}

export async function DeleteData(req, res) {
  const { id } = req.params;

  try {
    await DataSchema.deleteOne({ _id: id });
    res.status(200).send({ msg: "data deleted successfully" });
  } catch (err) {
    res.status(500).send({ msg: "delete failed", error: err });
  }
}


export async function updateData(req,res) {
    const {id} =req.params

    const {title,price,image} = req.body;

    DataSchema.updateOne({_id:id},{$set:{title,price,image}}).then(()=>{
        res.status(200).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({msg:error})
    })
}


export async function Register(req,res) {
    const {name,email,password} = req.body 
    if(!(name&&email&&password)){
        res.status(500).send({msg:"invalid input"})
    }
    else{
        bcrypt.hash(password,10).then((hpwd)=>{
            console.log(hpwd);
            
    
          UserSchema.create({name,email,password:hpwd}).then(()=>{
            res.status(200).send({msg:"success"})
          })
        }).catch((err)=>{
            
        res.status(500).send({msg:"error"})
    })
}
 }

export async function Login(req,res){

    const {email,password} = req.body
    if(!(email&&password))
        return res.status(500).send({msg:"invalid input"})
    const user = await UserSchema.findOne({email})
    if(!user)

    return res.status(500).send({msg:"user does not exist"})
    const success = await bcrypt.compare(password,user.Password)
    if(success!==true)
  return res.status(500).send({msg:"incorrect password"})
  

const token = await sign({UserID:user._id},process.env.JWT_kEY,{expiresIn:'24h'})
res.status(200).send({token})
// res.status(200).send("success")

}




export async function getuser(req,res) {

     const data =await UserSchema.find()
     res.status(200).send(data)
}

export async function GetSingleuser(req,res) {
    const {id} = req.params 
    
    await UserSchema.findOne({_id:id}).then((data)=>{
        res.status(200).send(data)

    }).catch((err)=>{
        res.status(500).send({error:err})
    })
}



export async function Deleteuser(req, res) {
  const { id } = req.params;

  try {
    await UserSchema.deleteOne({ _id: id });
    res.status(200).send({ msg: "data deleted successfully" });
  } catch (err) {
    res.status(500).send({ msg: "delete failed", error: err });
  }
}


export async function updateuser(req,res) {
    const {id} =req.params

    const {title,price,image} = req.body;

    UserSchema.updateOne({_id:id},{$set:{title,price,image}}).then(()=>{
        res.status(200).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({msg:error})
    })
}




