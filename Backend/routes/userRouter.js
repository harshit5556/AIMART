import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { getAdmin, getCurrentuser } from '../controllers/userController.js'
import AdminAuth from '../middleware/AdminAuth.js'
let userRoutes = express.Router()

userRoutes.post("/getcurrentuser", isAuth, getCurrentuser)
userRoutes.get("/getadmin",AdminAuth,getAdmin)
export default userRoutes