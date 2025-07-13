import express from "express"
import { addtocart , getUserCart, UpdateCart } from "../controllers/cartController.js"
import isAuth from '../middleware/isAuth.js'

const cartRoutes = express.Router()
cartRoutes.post('/get' , isAuth , getUserCart)
cartRoutes.post('/add' , isAuth , addtocart)
cartRoutes.post('/update' , isAuth , UpdateCart)

export default cartRoutes