function ClearLocalStorage(event) {
  event.preventDefault();
  localStorage.removeItem("Token");
  localStorage.removeItem("userId");
  window.location.href = "sign-in.html";
}
