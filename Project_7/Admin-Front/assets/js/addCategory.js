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
  
 alert("the Category added successfully")
  window.location.href = "showCategory.html";
}