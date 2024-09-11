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