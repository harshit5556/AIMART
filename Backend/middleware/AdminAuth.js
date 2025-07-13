import jwt from 'jsonwebtoken'

 const AdminAuth = async (req,res, next)=>{
    try{
      let {token} = req.cookies
      if(!token){
        return res.status(400).json({message:"Not Authorized Login Again"})
      }
      let verifytoken  = jwt.verify(token,process.env.JWT_SECRET)
      if(!verifytoken){
        return res.status(400).json({message:"Not Authorized Login Again"})

      }
      req.adminEmail = process.env.ADMIN_EMAIL
      next()
    }
    catch(error){
        console.log("AdminAuth error")
        return res.status(500).json({message:`AdminAuth error ${error}`})
    }
}

export default AdminAuth;