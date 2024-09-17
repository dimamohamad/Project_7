const url = "https://localhost:44338/api/AddUser/AddNewUser";
var form = document.getElementById("userForm");
async function add() {

  event.preventDefault();
  var formData = new FormData(form);
let response = await fetch(url, {
    method: "POST",
    body: formData
});
  var data = response;

  console.log(data);
  alert(" the user added successfully");
}