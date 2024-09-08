const url = "https://localhost:44339/Api/Products/AddNewProduct";
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

  alert("your product have been added successfully");
}