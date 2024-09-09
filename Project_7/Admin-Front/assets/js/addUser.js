const url = "https://localhost:44339/api/AddUser/AddNewUser";
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
  alert(" added user  successfully");
}