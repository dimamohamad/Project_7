const token = localStorage.Token;
const url = "https://localhost:44339";
const apiUrl = url + "/api/Cart/getCartItems";

// {
//     "cartItems": [
//       {
//         "cartItemId": 7,
//         "cartId": 5,
//         "quantity": 2,
//         "price": 918,
//         "productId": 1,
//         "product": {
//           "productId": 1,
//           "categoryId": 1,
//           "productImage1": "images/47568fda-edec-46fd-b901-9b3ef833cabd.jpg",
//           "productImage2": "images/6db4751a-58d0-4f4d-8b27-8f43b0bc5f8d.jpg",
//           "productImage3": "images/fbbab9ee-615b-4e54-8465-3a7fd0835674.jpg",
//           "productImage4": "images/bf666151-ce60-4f17-8f8b-1fdb70eb1e34.jpg",
//           "productImage5": "images/884015c0-1d62-4b05-8241-df86c5d5f613.jpg",
//           "productImage6": "images/8980858d-4d30-44c5-9987-bd9ccee08aaa.jpg",
//           "visiblity": true,
//           "productName": "Phone",
//           "description": "Very good Phone",
//           "price": 600,
//           "stockQuantity": 50,
//           "discountPercentage": 0.15,
//           "createdAt": "2024-09-08T11:43:35.587"
//         }
//       },
//       {
//         "cartItemId": 8,
//         "cartId": 5,
//         "quantity": 2,
//         "price": 27,
//         "productId": 2,
//         "product": {
//           "productId": 2,
//           "categoryId": 1,
//           "productImage1": "images/371b3a59-a63b-4a2b-b198-aaabef632d1b.jpg",
//           "productImage2": null,
//           "productImage3": null,
//           "productImage4": null,
//           "productImage5": null,
//           "productImage6": null,
//           "visiblity": true,
//           "productName": "nokia 4510",
//           "description": "the phone isn't phonning",
//           "price": 30,
//           "stockQuantity": 70,
//           "discountPercentage": 0.5,
//           "createdAt": "2024-09-09T05:04:38.37"
//         }
//       }
//     ],
//     "cart": {
//       "cartId": 5,
//       "userId": 1,
//       "voucherId": 4,
//       "createdAt": "2024-09-09T11:07:56.653",
//       "updatedAt": "2024-09-09T11:07:56.653",
//       "cartItems": [
//         {
//           "cartItemId": 7,
//           "cartId": 5,
//           "quantity": 2,
//           "price": 918,
//           "productId": 1,
//           "product": {
//             "productId": 1,
//             "categoryId": 1,
//             "productImage1": "images/47568fda-edec-46fd-b901-9b3ef833cabd.jpg",
//             "productImage2": "images/6db4751a-58d0-4f4d-8b27-8f43b0bc5f8d.jpg",
//             "productImage3": "images/fbbab9ee-615b-4e54-8465-3a7fd0835674.jpg",
//             "productImage4": "images/bf666151-ce60-4f17-8f8b-1fdb70eb1e34.jpg",
//             "productImage5": "images/884015c0-1d62-4b05-8241-df86c5d5f613.jpg",
//             "productImage6": "images/8980858d-4d30-44c5-9987-bd9ccee08aaa.jpg",
//             "visiblity": true,
//             "productName": "Phone",
//             "description": "Very good Phone",
//             "price": 600,
//             "stockQuantity": 50,
//             "discountPercentage": 0.15,
//             "createdAt": "2024-09-08T11:43:35.587",
//             "cartItems": [],
//             "category": null,
//             "reviews": []
//           }
//         },
//         {
//           "cartItemId": 8,
//           "cartId": 5,
//           "quantity": 2,
//           "price": 27,
//           "productId": 2,
//           "product": {
//             "productId": 2,
//             "categoryId": 1,
//             "productImage1": "images/371b3a59-a63b-4a2b-b198-aaabef632d1b.jpg",
//             "productImage2": null,
//             "productImage3": null,
//             "productImage4": null,
//             "productImage5": null,
//             "productImage6": null,
//             "visiblity": true,
//             "productName": "nokia 4510",
//             "description": "the phone isn't phonning",
//             "price": 30,
//             "stockQuantity": 70,
//             "discountPercentage": 0.5,
//             "createdAt": "2024-09-09T05:04:38.37",
//             "cartItems": [],
//             "category": null,
//             "reviews": []
//           }
//         }
//       ],
//       "user": {
//         "userId": 1,
//         "firstName": "John",
//         "lastName": "Do",
//         "userName": "John Do",
//         "email": "Johndo@gmail.com",
//         "passwordSalt": "rJNN7chGdk8PZVeRhsi1lVGSFg2jP5SAxhruu11M8Hd2DjDCvgAM+nM9jfedZ02A/i7WJ+ubwqxWfdgD6ihLTzKus6iVkF7/xXAwQldW6KJ/2uVqLIiDwQOXnvMVvTTs1u1wqAVLR3/Rt+BqQHghZOMj1a20cDADoJqGp8ave6U=",
//         "passwordHash": "slW88nR3HqCwgfkyAWLZjbcU6cCDhcYz3npcSq4fG3l0je7vl1utRA4Bbj0GFm2TsQZwbipcCQK4c1uknA9p5A==",
//         "passwword": "0000",
//         "userImage": null,
//         "phoneNumber": null,
//         "address": null,
//         "preferences": null,
//         "loyaltyPoints": 0,
//         "createdAt": "2024-09-07T09:26:12.73",
//         "carts": [],
//         "orders": [],
//         "reviews": []
//       },
//       "voucher": {
//         "voucherId": 4,
//         "voucherCode": "test1",
//         "discountPercentage": 0.1,
//         "startDate": "2024-01-01",
//         "endDate": "2024-12-12",
//         "isActive": true,
//         "carts": [],
//         "orders": []
//       }
//     }
//   }

async function removeCartItem(cartItemId) {
  let removeUrl = url + "/api/Cart/deleteFromCart/" + cartItemId;
  let response = await fetch(removeUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

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
        message: "Something went wrong",
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
  console.log(cart);

  let promoCodeInput = document.getElementById("code");
  promoCodeInput.value = cart.voucher.voucherCode;

  console.log("Data fetched successfully:", data);
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
