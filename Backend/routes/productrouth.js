import express from 'express';
import { addProduct, listProduct, removeProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import AdminAuth from '../middleware/AdminAuth.js'
const productrouth = express.Router();


productrouth.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct )

  productrouth.get("/list",listProduct)
  productrouth.post("/remove/:id",AdminAuth,removeProduct)

export default productrouth;
