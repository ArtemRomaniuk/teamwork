import * as XLSX from "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm";

document
  .querySelector(".save-to-excel")
  .addEventListener("click", () =>
    XLSX.writeFile(
      XLSX.utils.table_to_book(document.querySelector("#products_table")),
      "table.xlsx",
    ),
  );

// FORM
const calcForm = document.querySelector("#calc-form");
const formBtn = document.querySelector(".form-button");
const addProductHandler = async () => {
  if (calcForm.checkValidity()) {
    const name = document.querySelector("input[name='name']").value;
    const quantity = Number(
      document.querySelector("input[name='quantity']").value,
    );
    const basic_materials = Number(
      document.querySelector("input[name='basic_materials']").value,
    );
    const sub_materials = Number(
      document.querySelector("input[name='sub_materials']").value,
    );
    const rev_waste = Number(
      document.querySelector("input[name='rev_waste']").value,
    );
    const basic_salary = Number(
      document.querySelector("input[name='basic_salary']").value,
    );
    const sub_salary = Number(
      document.querySelector("input[name='sub_salary']").value,
    );
    const general_exp = Number(
      document.querySelector("input[name='general_exp']").value,
    );
    const esv = (basic_salary + sub_salary) * 0.22;
    const prod_prep = 2 * basic_salary;
    const administrative_exp = 1.2 * basic_salary;
    const general_cost =
      basic_materials +
      sub_materials -
      rev_waste +
      basic_salary +
      sub_salary +
      esv +
      prod_prep +
      general_exp +
      administrative_exp;

    const product = {
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
    };

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  }
};
const editProductHandler = async (id) => {
  if (calcForm.checkValidity()) {
    const name = document.querySelector("input[name='name']").value;
    const quantity = Number(
      document.querySelector("input[name='quantity']").value,
    );
    const basic_materials = Number(
      document.querySelector("input[name='basic_materials']").value,
    );
    const sub_materials = Number(
      document.querySelector("input[name='sub_materials']").value,
    );
    const rev_waste = Number(
      document.querySelector("input[name='rev_waste']").value,
    );
    const basic_salary = Number(
      document.querySelector("input[name='basic_salary']").value,
    );
    const sub_salary = Number(
      document.querySelector("input[name='sub_salary']").value,
    );
    const general_exp = Number(
      document.querySelector("input[name='general_exp']").value,
    );
    const esv = (basic_salary + sub_salary) * 0.22;
    const prod_prep = 2 * basic_salary;
    const administrative_exp = 1.2 * basic_salary;
    const general_cost =
      basic_materials +
      sub_materials -
      rev_waste +
      basic_salary +
      sub_salary +
      esv +
      prod_prep +
      general_exp +
      administrative_exp;

    const product = {
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
    };

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    formBtn.textContent = "Додати продукт";
    formBtn.removeEventListener("click", formBtn._editProductHandler);
    formBtn.addEventListener("click", addProductHandler);
  }
};

formBtn.addEventListener("click", addProductHandler);

document.querySelectorAll(".btn-edit").forEach((btn) =>
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    formBtn.textContent = "Змінити продукт";
    formBtn.removeEventListener("click", addProductHandler);
    formBtn._editProductHandler = () => editProductHandler(id);
    formBtn.addEventListener("click", formBtn._editProductHandler);
  }),
);

document.querySelectorAll(".btn-delete").forEach((btn) =>
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  }),
);
