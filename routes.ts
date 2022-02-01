import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from "./controllers/products.ts";
/**
 * Utworzenie nowych ścieżek URL
 */
const router = new Router();
/**
 * Obsługa metod:
 * GET - pobrania produktów/produktu z bazy
 * PATCH - modyfikacji produktu po ID
 * POST - dodania produktu
 * DELETE - usunięcia produktu po ID
 */
router.get("/api/product", getProducts)
  .get("/api/product/:id", getSingleProduct)
  .patch("/api/product/:id", updateProduct)
  .post("/api/product", addProduct)
  .delete("/api/product/:id", deleteProduct);

export default router;
