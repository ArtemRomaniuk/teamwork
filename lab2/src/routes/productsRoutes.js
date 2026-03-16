import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../controllers/productsControllers.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", addProduct);
productsRouter.put("/:id", editProduct);
productsRouter.delete("/:id", deleteProduct);

export default productsRouter;
