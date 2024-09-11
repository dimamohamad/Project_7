const url = "https://localhost:44338/api/Categories";
debugger;
var form = document.getElementById("addCategoryForm");
async function addCategory() {
  debugger;
  event.preventDefault();
  var formData = new FormData(form);
  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  var data = response;

 
  iziToast.success({
    title: "Add category",
    message: "Your category has been added successfully",
    position: "topCenter",
    timeout: 3000,
  });
  window.location.href = "showCategory.html";
}