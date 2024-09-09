async function changePassword(event) {
  event.preventDefault(); // Prevent the form from submitting the default way

  var id = localStorage.getItem("userId");
  var url = `https://localhost:44339/api/Users/ChangePassword/${id}`;
  var form = document.getElementById("ChangePasswordForm");

  // Create a FormData object from the form
  var formData = new FormData(form);
  var body = {};
  formData.forEach((value, key) => {
    body[key] = value;
  });

  // Convert the body object to JSON
  var response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    // Handle success
    alert("Password changed successfully.");
    console.log("Password changed successfully.");
  } else {
    // Handle error
    console.error("Error changing password:", response.statusText);
  }
}
