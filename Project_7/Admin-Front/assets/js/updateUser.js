const n = localStorage.getItem("userId");

const url =`https://localhost:44338/api/AddUser/UpdateUser${n}`;

var form = document.getElementById('userForm');


async function edit(){
    event.preventDefault(); 
   debugger;
    const formData = new FormData(form);

    let response = await fetch (url,{
        method : 'PUT',
        body : formData
    });
    var data = response;

    if (response.ok) {
        alert("User updated successfully");
        window.location.href = "adduser.html";
    } else {
        alert("Failed to update user");
        console.error("Error:", response.statusText);
    }
    
   
    window.location.href = "showuser.html";
}

async function getcategory() {
    let n = localStorage.getItem("userId");
    var url = `https://localhost:44338/api/AddUser/GetUserByID${n}`;
    let response = await fetch(url);
    let result = await response.json();
    document.getElementById("firstName").value = result.firstName;
    document.getElementById("lastName").value = result.lastName;
    document.getElementById("userName").value=result.userName;
    document.getElementById("email").value = result.email;
    document.getElementById("userImage").value = result.userImage;
    document.getElementById("phoneNumber").value = result.phoneNumber;
    document.getElementById("address").value = result.address;

  
  }
  getcategory();