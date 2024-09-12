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

// async function getCategoryName() {
//   const dropDown = document.getElementById("dropDownList");
//   let url = "https://localhost:44338/API/Categories/GetAllCategories";
//   let request = await fetch(url);
//   let data = await request.json();

//   data.forEach((select) => {
//     dropDown.innerHTML += (
//       <option value="${select.categoryId}">${select.categoryName}</option>
//     );
//   });
// }

async function getProduct() {
  let n = localStorage.getItem("productId");
  var url = `https://localhost:44338/Api/Products/GetProductsById/${n}`;
  let response = await fetch(url);
  let result = await response.json();
  document.getElementById("CategoryId").value = result.CategoryId;
  document.getElementById("productName").value = result.productName;
  document.getElementById("Description").value = result.description;
  document.getElementById("Price").value = result.price;
  document.getElementById("ProductImage1").value = result.ProductImage1;
  document.getElementById("ProductImage2").value = result.ProductImage2;
  document.getElementById("ProductImage3").value = result.ProductImage3;
  document.getElementById("ProductImage4").value = result.ProductImage4;
  document.getElementById("ProductImage5").value = result.ProductImage5;
  document.getElementById("ProductImage6").value = result.ProductImage6;
  document.getElementById("Visiblity").value = result.Visiblity;
  document.getElementById("StockQuantity").value = result.StockQuantity;
  document.getElementById("DiscountPercentage").value =result.DiscountPercentage;
}
getProduct();
