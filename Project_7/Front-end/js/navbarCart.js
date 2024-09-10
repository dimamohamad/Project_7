let cartItemsList = document.getElementById("cartItemsList");
const cartItemsDiv = document.getElementById("cartItemsList");
const TheToken = localStorage.Token;
const urlForApi = "https://localhost:44339";
const apiUrl = urlForApi + "/api/Cart/getCartItems";
console.log("this is working");

// If local storage has token take the cart from the fetch
if (TheToken) {
  getCartItemsFromApi();
}
// else get the cart items from the local storage
else {
  getCartItemsFromLocalStorage();
}

// Get the cart items from local storage
async function getCartItemsFromLocalStorage() {
  let cartItems = localStorage.getItem("offlineCart");
  if (!cartItems) {
    cartItems = "[]";
  }
  cartItems = JSON.parse(cartItems);
  if (cartItems.length !== 0) {
    cartItems.forEach((item) => {
      cartItemsDiv.innerHTML += createCartItemCard(
        item.productName,
        item.productImage
      );
    });
  }
  document.getElementById("cartItemCount").innerText = cartItems.length;
}

// Get the cart items from the API
async function getCartItemsFromApi() {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TheToken}`,
    },
  });
  const data = await response.json();

  let cartItems = data.cartItems;
  let cart = data.cart;
  let totalPrice = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);
  if (cartItems.length !== 0) {
    document.getElementById("cartIsEmpty").remove();
    cartItems.forEach((item) => {
      cartItemsDiv.innerHTML += createCartItemCard(
        item.product.productName,
        item.product.productImage1
      );
    });
  }
  document.getElementById("cartItemCount").innerText = cartItems.length;
  return cartItems;
}

function createCartItemCard(productName, productImage1) {
  return `
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
                      src="${urlForApi + "/" + productImage1}"
                      alt="img"
                    />
                  </figure>
                  <div>
                    <div
                      class="line-clamp-2 font-semibold text-default-600 transition-all duration-300 hover:text-primary-500"
                      href="#"
                    >
                      ${productName}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>`;
}
