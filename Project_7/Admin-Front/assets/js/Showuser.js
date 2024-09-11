const url = 'https://localhost:44338/api/AddUser/GetAllUsers';

async function adduser(){
    var response = await fetch(url);
    var result = await response.json();
    // event.preventDefault();
    
    var table = document.getElementById('table');
    result.forEach(element => {
        table.innerHTML += `


    <tr>
      <th scope="row">${element.userId}</th>
    <td><img src="https://localhost:44338/${element.userImage}" alt="User Image" width="50" height="50"></td>
      <td>${element.userName}</td>
       <td>${element.email}</td>
      <td>${element.phoneNumber}</td>
        <td>${element.address}</td>
          
        <td><a onclick="Update(${element.userId})" >Edit</a></td>
        <td><a  onclick="Delete(${element.userId})" >Delete</a></td>

    </tr>

  `;
    });

}
function Update(id) {
  localStorage.setItem("userId", id);
  window.location.href = "UpdateUser.html";
}

async function Delete(id) {
    debugger;
  var url =`https://localhost:44338/api/AddUser/DeleteUser${id}`;
 let response = await fetch(url, {
    method: "DELETE",
  });
  
  alert(" deleted user successfully");
}






adduser();