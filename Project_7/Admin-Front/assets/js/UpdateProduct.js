const n = localStorage.getItem("productId");
var url = `https://localhost:44338/Api/Products/UpdateOnproduct/${n}`;
var form = document.getElementById("UpdateProductForm");
async function UpdateProductform() {
  var formData = new FormData(form);
  event.preventDefault();
  let response = await fetch(url, {
    method: "PUT",
    body: formData,
  });

  var data = response;
  window.location.href = "products.html";
  alert("your product has successfully edited");
}

async function getCategoryName() {
  const dropDown = document.getElementById("dropDownList");
  let url = "https://localhost:44338/API/Categories/GetAllCategories";
  let request = await fetch(url);
  let data = await request.json();

  data.forEach((select) => {
    dropDown.innerHTML += (
      <option value="${select.categoryId}">${select.categoryName}</option>
    );
  });
}

async function getProduct() {
  let n = localStorage.getItem("productId");
  var url = `https://localhost:44338/Api/Products/UpdateOnproduct/${n}`;
  let response = await fetch(url);
  let result = await response.json();
  document.getElementById("productName").value = result.productName;
  document.getElementById("Description").value = result.description;
  document.getElementById("Price").value = result.categoryImage;
}
getProduct();
