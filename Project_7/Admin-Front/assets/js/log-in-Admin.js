async function loginAdmin(event) {
  event.preventDefault(); // Prevent the default form submission

  var url = `https://localhost:44338/api/Admin/LoginAdmin`;
  var form = document.getElementById("bassam");
  var formData = new FormData(form);

  try {
    var response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Handle success
      alert("Login successful!");
      window.location.href = "showuser.html"; // Correctly set the URL to navigate to
    } else {
      // Handle error
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
  }
}
