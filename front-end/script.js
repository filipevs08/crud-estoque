const tBody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const nameInput = document.querySelector(".nameInput");
const categorieInput = document.querySelector(".categorieInput");
const quantityInput = document.querySelector(".quantityInput");

const fetchProducts = async () => {
  const res = await fetch("http://localhost:3000/products");
  const items = await res.json();
  return items;
};
const clearInput = () => {
  nameInput.value = "";
  categorieInput.value = "";
  quantityInput.value = "";
};
// criar função para validar o input
const validateInput = () => {
  if (
    nameInput.value === "" ||
    categorieInput.value === "" ||
    quantityInput.value === ""
  ) {
    alert("Preencha todos os campos!");
    return;
  }

  createProduct();
};
const deleteProduct = async (id) => {
  await fetch(`http://localhost:3000/delete-product/${id}`, {
    method: "DELETE",
  });
  loadProducts();
};
const createProduct = async () => {
  let product = {
    name: nameInput.value,
    categorie: categorieInput.value,
    quantity: parseInt(quantityInput.value),
  };
  // O segundo parametro da fetch é um objeto de configuração
  const result = await fetch("http://localhost:3000/create-product", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });
  clearInput();
  loadProducts();
};

const updateProduct = async (product) => {
  const { ID, name, categorie, quantity } = product;

  await fetch(`http://localhost:3000/update-product/${ID}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name, categorie, quantity }),
  });
  loadProducts();
};

const createElement = (tag, innerText = "", innerHTML = "") => {
  const element = document.createElement(tag);

  // verifica se o parametro recebido é innerhtml ou innertext
  if (innerText) {
    element.innerText = innerText;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};
const createRow = (product) => {
  const { ID, name, categorie, quantity } = product;

  const tr = createElement("tr");
  const tdName = createElement("td", name);
  const tdCategorie = createElement("td", categorie);
  const tdQuantity = createElement("td", quantity);
  const tdActions = createElement("td");

  const editButton = createElement(
    "button",
    "",
    "<span class='material-symbols-outlined'>edit_square</span>"
  );
  const deleteButton = createElement(
    "button",
    "",
    "<span class='material-symbols-outlined'>delete</span>"
  );

  const editNameForm = createElement("form");
  const editCategorieForm = createElement("form");
  const editQuantityForm = createElement("form");

  const editName = createElement("input");
  const editCategorie = createElement("input");
  const editQuantity = createElement("input");

  editName.value = name;
  editCategorie.value = categorie;
  editQuantity.value = quantity;

  editNameForm.appendChild(editName);
  editCategorieForm.appendChild(editCategorie);
  editQuantityForm.appendChild(editQuantity);

  editNameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateProduct({
      ID: ID,
      name: editName.value,
      preco: editCategorie.value,
      qtd: editQuantity.value,
    });
  });
  editCategorieForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateProduct({
      ID: ID,
      name: editName.value,
      categorie: editCategorie.value,
      quantity: editQuantity.value,
    });
  });
  editQuantityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateProduct({
      ID: ID,
      name: editName.value,
      categorie: editCategorie.value,
      quantity: editQuantity.value,
    });
  });

  editButton.addEventListener("click", () => {
    tdName.innerText = "";
    tdCategorie.innerText = "";
    tdQuantity.innerText = "";
    tdName.appendChild(editNameForm);
    tdCategorie.appendChild(editCategorieForm);
    tdQuantity.appendChild(editQuantityForm);
  });

  editButton.classList.add("action-btn");
  deleteButton.classList.add("action-btn");

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    deleteProduct(ID);
  });

  tr.appendChild(tdName);
  tr.appendChild(tdCategorie);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdActions);

  return tr;
};

const loadProducts = async () => {
  const products = await fetchProducts();
  tBody.innerHTML = "";
  products.forEach((product) => {
    const tr = createRow(product);
    tBody.appendChild(tr);
  });
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
});
loadProducts();
