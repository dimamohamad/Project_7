const n = localStorage.getItem("CategoryId");
debugger;
var url =` https://localhost:44339/Api/Categories/UpdateCategory/${n}`;
var form = document.getElementById("updateCategoryForm");
async function UpdateCategory() {
  var formData = new FormData(form);
  event.preventDefault();
  let response = await fetch(url, {
    method: "PUT",
    body: formData,
  });
  var data = response;
  window.location.href = "showCategory.html";
  alert("your category has successfully updated");
}

async function getcategory() {
  let n = localStorage.getItem("CategoryId");
  var url = `https://localhost:44339/Api/Categories/GetCategorysbyId/${n}`;
  let response = await fetch(url);
  let result = await response.json();
  document.getElementById("CategoryName").value = result.categoryName;
  document.getElementById("Description").value = result.description;
  document.getElementById("CategoryImage").value=result.categoryImage;

  
}
getcategory();