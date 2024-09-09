debugger;
let loginForm = document.getElementById("LoginForm");
let url = "https://localhost:44339/api/Users/LoginUsers";
loginForm.addEventListener("submit", async (event) => {
  console.log("This is working");

  event.preventDefault();
  var formdata = new FormData(loginForm);
  formdata.forEach((key, name) => console.log(name, key));

  const response = await fetch(url, {
    method: "POST",
    body: formdata,
  });

  const result = await response.json();

  if (response.ok) {
    localStorage.setItem("Token", result.token);
    localStorage.setItem("userId", result.user.userId);
    console.log("Login successful:", result);
    alert("Login Successful");
    window.location.href = "index.html";
  } else {
    console.error("Login failed:", result);
    alert("Please Enter a Valid Email or Password");
  }
});

// document.getElementById("Login").addEventListener("submit", ValidateEmail);
