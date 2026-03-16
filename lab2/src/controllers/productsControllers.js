import db from "../utils/db.js";

export const getProducts = (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.status(200).send(products);
};

export const addProduct = (req, res) => {
  const {
    name,
    quantity,
    basic_materials,
    sub_materials,
    rev_waste,
    basic_salary,
    sub_salary,
    esv,
    prod_prep,
    general_exp,
    administrative_exp,
    general_cost,
  } = req.body;

  db.prepare(
    `INSERT INTO products (name, quantity, basic_materials, sub_materials, rev_waste, basic_salary, sub_salary, esv, prod_prep, general_exp, administrative_exp, general_cost)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    name,
    quantity,
    basic_materials,
    sub_materials,
    rev_waste,
    basic_salary,
    sub_salary,
    esv,
    prod_prep,
    general_exp,
    administrative_exp,
    general_cost,
  );
  res.status(201).redirect("/");
};

export const editProduct = (req, res) => {
  const { id } = req.params;

  const {
    name,
    quantity,
    basic_materials,
    sub_materials,
    rev_waste,
    basic_salary,
    sub_salary,
    esv,
    prod_prep,
    general_exp,
    administrative_exp,
    general_cost,
  } = req.body;

  db.prepare(
    `UPDATE products 
    SET name=?, quantity=?, basic_materials=?, sub_materials=?, rev_waste=?, basic_salary=?, sub_salary=?, esv=?, prod_prep=?, general_exp=?, administrative_exp=?, general_cost=?
    WHERE id = ?`,
  ).run(
    name,
    quantity,
    basic_materials,
    sub_materials,
    rev_waste,
    basic_salary,
    sub_salary,
    esv,
    prod_prep,
    general_exp,
    administrative_exp,
    general_cost,
    id,
  );
  res.status(200).redirect("/");
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  res.status(204).redirect("/");
};
