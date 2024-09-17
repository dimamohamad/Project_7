async function Register() {
  event.preventDefault();
  let url = "https://localhost:44338/api/Users/RegisterUsers";

  const formData = new FormData(document.getElementById("Register"));

  var password = formData.get("Passwword");
  var repeatPassword = formData.get("repeatpassword");

  // Validate passwords
  if (password !== repeatPassword) {
    alert(
      "Passwords do not match. Please make sure both passwords are the same."
    );
    return; // Stop the function execution
  }
  const response = await fetch(url, {
    method: "POST",

    body: formData,
  });

  const result = await response.json();

  if (response.ok) {
    alert("Registration Successful");
    window.location.href = "sign-in.html";
  } else {
    console.error("Registration failed:", result);
    alert("Please Enter a Valid Email or Password");
  }
}
