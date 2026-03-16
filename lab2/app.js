import express from "express";
import "dotenv/config";
import productsRouter from "./src/routes/productsRoutes.js";
import db from "./src/utils/db.js";

const app = express();
app.set("view engine", "pug");

app.use(express.json());
app.use("/views", express.static("./views"));

app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.status(200).render("index", { title: "Lab2", products });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on http://localhost:${process.env.PORT}`),
);
