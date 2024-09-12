const url = "https://localhost:44338/Api/Products/AddNewProduct";
debugger;
var form = document.getElementById("addProductForm");
async function addProduct() {
  debugger;
  event.preventDefault();
  var formData = new FormData(form);
  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  var data = response;
  alert("the Product added successfully")
   window.location.href=("products.html");
}