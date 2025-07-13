import jwt from 'jsonwebtoken'

export const isAuth = async (req,res, next)=>{
    try{
      let {token} = req.cookies
      if(!token){
        return res.status(400).json({message:"User does not have token"})
      }
      let verifytoken  = jwt.verify(token,process.env.JWT_SECRET)
      if(!verifytoken){
        return res.status(400).json({message:"User does not have valid token"})
      }
     req.userId = verifytoken.userId
     next() 
    }
    catch(error){
       console.log("isAuth error")
       return res.status(500).json({message:`isAuth error ${error}`})
    }
}

export default isAuth