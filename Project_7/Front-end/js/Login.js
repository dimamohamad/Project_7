let loginForm = document.getElementById("LoginForm");
let url = "https://localhost:44339/api/Users/LoginUsers";
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  var formdata = new FormData(loginForm);

  const response = await fetch(url, {
    method: "POST",
    body: formdata,
  });

  const result = await response.json();

  if (response.ok) {
    localStorage.setItem("Token", result.token);
    localStorage.setItem("userId", result.user.userId);
    let offlineCart = localStorage.offlineCart;
    if (offlineCart) {
      offlineCart = JSON.parse(offlineCart);
      offlineCart.forEach((item) =>
        addProductToCart(item.productId, item.quantity)
    );
    localStorage.removeItem("offlineCart");
  }
   localStorage.messeges=JSON.stringify([{
    title:"login successful",
    message:"you have been logged successfully"

   }])
    window.location.href = "index.html";
  } else {
    console.error("Login failed:", result);
    iziToast.error({
      title: "Bad credintial",
      message: "please make sure that you have entered a valid email and password",
      position: "topCenter",
      timeout: 3000,
    });
  }
});

// document.getElementById("Login").addEventListener("submit", ValidateEmail);
async function addProductToCart(productId, quantity) {
  let url = "https://localhost:44339/api/Cart/addToCart";
  let data = {
    productId: productId,
    quantity: quantity,
  };
  console.log(data);

  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.Token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    alert("Product added to cart successfully");
    location.reload();
  } else {
    alert("Something went wrong");
  }
}
