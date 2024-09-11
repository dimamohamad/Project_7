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
      for (let item of offlineCart) {
        await addProductToCart(item.productId, item.quantity);
      }
      localStorage.removeItem("offlineCart");
    }
    alert("Login Successful");
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

  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.Token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    iziToast.success({
      title: "Product Added to Cart",
      message: "Product Added to your profile Cart successfully",
      position: "topCenter",
      timeout: 3000,
      close: false,
    });
  } else {
    alert("Something went wrong");
  }
}
