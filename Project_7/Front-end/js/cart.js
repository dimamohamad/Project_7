const token = localStorage.Token;
const url = "https://localhost:44338";
const apiUrl = url + "/api/Cart/getCartItems";

async function removeCartItem(cartItemId) {
  let removeUrl = url + "/api/Cart/deleteFromCart/" + cartItemId;
  let response = await fetch(removeUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    iziToast.success({
      title: "Item Removed",
      message: "Your item has been removed successfully",
      position: "topCenter",
      timeout: 3000,
    });
    getCartItems();
  } else {
    iziToast.error({
      title: "Error",
      message: "Something went wrong",
      position: "topCenter",
      timeout: 3000,
    });
  }
}
async function updateCartItem(cartItemId, quantity) {
  let updateUrl = url + "/api/Cart/updateCartItem/" + cartItemId;
  let response = await fetch(updateUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  });
  if (response.ok) {
    iziToast.success({
      title: "Quantity Updated",
      message: "Your quantity has been updated successfully",
      position: "topCenter",
      timeout: 3000,
    });
    getCartItems();
  } else {
    iziToast.error({
      title: "Error",
      message: "Something went wrong",
      position: "topCenter",
      timeout: 3000,
    });
  }
}

let promoCodeForm = document.getElementById("promoCodeForm");
promoCodeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let promoCodeInput = document.getElementById("code");
  let promoCode = promoCodeInput.value;
  if (promoCode.length > 0) {
    let response = await fetch(url + "/api/Cart/AddVoucher", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        voucherCode: promoCode,
      }),
    });
    if (response.ok) {
      iziToast.success({
        title: "Promo Code Applied",
        message: "Your voucher code has been applied successfully",
        position: "topCenter",
        timeout: 3000,
      });
      getCartItems();
    } else {
      iziToast.error({
        title: "Error",
        message: "Voucher is not valid",
        position: "topCenter",
        timeout: 3000,
      });
    }
  }
});

// Get all cart items
async function getCartItems() {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  let cartItems = data.cartItems;
  let cart = data.cart;

  let promoCodeInput = document.getElementById("code");
  if (cart.voucher) {
    promoCodeInput.value = cart.voucher.voucherCode;
  }

  let cartItemsDiv = document.getElementById("cartItemsList");
  let totalPrice = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);
  document.getElementById("cartTotaSpan").innerText = document.getElementById(
    "totalPriceSpan"
  ).innerText = "$" + totalPrice;
  cartItemsDiv.innerHTML = "";
  cartItems.forEach((item) => {
    cartItemsDiv.innerHTML += `
      <div
              class="relative grid grid-cols-8 mb-4 gap-5 rounded-lg bg-white p-4 shadow-[0_2px_10px_rgba(131,125,125,.12)]"
            >
              <div class="col-span-8 sm:col-span-4 xl:col-span-3">
                <b class="mb-4 block xl:hidden">Product</b>
                <div class="flex gap-3">
                  <figure
                    class="h-[100px] w-[100px] min-w-[100px] overflow-hidden rounded-lg border"
                  >
                    <img
                      class="h-full w-full object-contain"
                      src="${url + "/" + item.product.productImage1}"
                      alt="img"
                    />
                  </figure>
                  <div>
                    <a
                      class="line-clamp-2 font-semibold text-default-600 transition-all duration-300 hover:text-primary-500"
                      href="#"
                    >
                      ${item.product.productName}
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-span-8 sm:col-span-4 xl:col-span-2">
                <b class="mb-4 block xl:hidden">Price</b>
                <div>
                  <span style="text-decoration: line-through;" class="font-bold text-secondary-500">$${
                    item.product.price
                  }</span>
                  <span class="font-bold text-primary-500">$
                  ${item.price / item.quantity}</span>
                </div>
              </div>
              <div class="col-span-8 sm:col-span-4 xl:col-span-2">
                <b class="mb-4 block xl:hidden">Quantity</b>
                <div class="counter flex w-28 rounded border bg-white">
                  <button 
                  onclick="updateCartItem(${item.cartItemId},${
      item.quantity - 1
    })" 
                  class="decrement w-full p-2" 
                  type="button">
                    <svg
                      class="pointer-events-none h-3 w-3"
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 448 512"
                      height="200px"
                      width="200px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                      ></path>
                    </svg>
                  </button>
                  <input
                    class="counter-value w-full border-none text-center focus:border-none focus:ring-0"
                    type="number"
                    name="quantity"
                    value="${item.quantity}"
                  />
                  <button
                  onclick="updateCartItem(${item.cartItemId},${
      item.quantity + 1
    })"
                   class="increment p-2" type="button">
                    <svg
                      class="pointer-events-none h-3 w-3"
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 448 512"
                      height="200px"
                      width="200px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="col-span-8 sm:col-span-4 xl:col-span-1">
                <b class="mb-4 block xl:hidden">Total</b>
                <span class="font-bold text-primary-500">$${item.price}</span>
              </div>
              <button
                class="absolute -right-3 -top-3 rounded-lg bg-primary-500 p-[5px] text-white transition-all duration-300 hover:bg-primary-600"
                onclick="removeCartItem(${item.cartItemId})"
              >
                <svg
                  class="h-5 w-5"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="200px"
                  width="200px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>`;
  });
}

getCartItems();

document
  .getElementById("checkoutButton")
  .addEventListener("click", openPaymentWindow);

// Function to open the payment link and close the window when it navigates to a specific page
async function openPaymentWindow() {
  let userResponse = await fetch(
    "https://localhost:44338/api/Users/getCurrentUserInfo",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.Token}`,
      },
    }
  );
  let userData = await userResponse.json();
  if (userData.address === null) {
    iziToast.error({
      title: "Error",
      message: "Please add your address into your profile before checkout",
      position: "topCenter",
      timeout: 3000,
    }).then(()=> window.location.href = "profile.html");

    return;
  }

  let response = await fetch("https://localhost:44338/api/Cart/checkout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  let data = await response.json();

  // Open the payment window
  let paymentWindow = window.open(
    data.approvalUrl,
    "PaymentWindow",
    "width=800,height=600"
  );

  // Set an interval to periodically check the URL of the payment window
  let checkInterval = setInterval(function () {
    try {
      // Check if the window is still open and the URL contains the target string
      if (
        paymentWindow &&
        paymentWindow.location.href.includes("api/Cart/success")
      ) {
        // Close the payment window
        paymentWindow.close();
        // Clear the interval to stop checking
        clearInterval(checkInterval);
        window.location.href = "index.html";
      }
    } catch (e) {
      // Ignore any cross-origin access errors
    }

    // Close the interval if the window is closed manually
    if (paymentWindow && paymentWindow.closed) {
      clearInterval(checkInterval);
      window.location.href = "index.html";
    }
  }, 1000); // Check every second (1000 milliseconds)
}
