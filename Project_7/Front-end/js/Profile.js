document.addEventListener("DOMContentLoaded", (event) => {
  // Load user ID from local storage
  const userId = localStorage.getItem("userId");
  if (userId) {
    fetchUserData(userId);
  }

  // Add event listener for file input change
  document.getElementById("fileInput").addEventListener("change", previewImage);
});

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById("profileImage");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function fetchUserData(id) {
  fetch(`https://localhost:44339/api/Users/ShowUserByID/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("fname").value = data.firstName || "";
      document.getElementById("lname").value = data.lastName || "";
      document.getElementById("username").value = data.userName || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("phonenum").value = data.phoneNumber || "";
      document.getElementById("profileImage").src =
        `https://localhost:44339/UsersImage/${data.userImage}` ||
        "https://via.placeholder.com/150";
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

function saveChanges() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("No user ID found in local storage.");
    return;
  }

  const formData = new FormData();
  formData.append("FirstName", document.getElementById("fname").value);
  formData.append("LastName", document.getElementById("lname").value);
  formData.append("UserName", document.getElementById("username").value);
  formData.append("Email", document.getElementById("email").value);
  formData.append("PhoneNumber", document.getElementById("phonenum").value);
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length > 0) {
    formData.append("UserImage", fileInput.files[0]);
  }

  fetch(`https://localhost:44339/api/Users/UpdateUser/${userId}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("User data updated successfully.");
    })
    .catch((error) => console.error("Error updating user data:", error));
}

function deleteAccount() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("No user ID found in local storage.");
    return;
  }

  fetch(`https://localhost:44339/api/Users/DeleteUser/${userId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Account deleted successfully.");
      localStorage.removeItem("userId");
      window.location.href = "/Login/Login.html";
    })
    .catch((error) => console.error("Error deleting user account:", error));
}

async function getAllOrders() {
  let response = await fetch(
    "https://localhost:44339/api/Users/getCurrentUserInfo",
    {
      headers: {
        Authorization: `Bearer ${localStorage.Token}`,
      },
    }
  );
  let data = await response.json();
  console.log(data);
}

getAllOrders();
