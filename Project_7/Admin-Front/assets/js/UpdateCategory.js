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