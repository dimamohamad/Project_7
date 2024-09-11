let token = localStorage.getItem("Token");

if (!token) {
  document.getElementById("createCommentForm").remove();
} else {
  new StarRating("#rating-value");
}

async function showProductDetail() {
  const x = localStorage.getItem("productId");
  let url = `https://localhost:44338/Api/Products/GetProductsById/${x}`;

  let response = await fetch(url);

  let result = await response.json();
  var container = document.getElementById("ProductDetailssection");

  container.innerHTML = `
   <div
          class="col-span-6 flex max-h-[500px] w-full flex-col gap-4 lg:col-span-3 lg:flex-row"
        >
          <div
            class="swiper swiper-product relative order-1 flex w-full flex-1 items-center overflow-hidden rounded-lg lg:order-2"
          >
            <div class="swiper-wrapper">
              <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage1}" alt="" />
              </figure>
              <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage2}" alt="" />
              </figure>
              <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage3}" alt="" />
              </figure>
              <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage4}" alt="" />
              </figure>
                <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage5}" alt="" />
              </figure>
                <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage6}" alt="" />
              </figure>
            </div>
            <div
              class="button-prev absolute left-0 z-10 select-none rounded p-1 text-center text-primary-500"
            >
              <svg
                class="h-8 w-8"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                ></path>
              </svg>
            </div>
            <div
              class="button-next absolute right-0 z-10 select-none rounded p-1 text-center text-primary-500"
            >
              <svg
                class="h-8 w-8"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            class="swiper swiper-thumbs relative order-2 h-[50px] w-full lg:order-1 lg:h-full lg:w-[50px]"
          >
            <div class="swiper-wrapper">
              <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage1}" alt="" />
              </figure>
              <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage2}" alt="" />
              </figure>
              <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage3}" alt="" />
              </figure>
              <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage4}" alt="" />
              </figure>
                <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage5}" alt="" />
              </figure>
                <figure class="swiper-slide">
                <img src="https://localhost:44338/${result.productImage6}" alt="" />
              </figure>
            </div>
          </div>
        </div>
        <div class="col-span-6 lg:col-span-3">
          <div class="mb-2 flex items-center justify-between gap-5">
            <div class="flex items-center gap-1">
              <div class="rater my-2" data-rater="5"></div>
     
            </div>
            
          </div>
          <h2 class="text-2xl font-semibold text-default-600">
             ${result.productName}
          </h2>
          <div class="my-2 flex items-center gap-2">
            <span class="text-xl font-bold text-primary-500"> $${result.price}</span>
  
          </div>
          <div class="mb-5 border-b-2 pb-5">
            <p class="line-clamp-3">
             ${result.description}
            </p>
          </div>
          <form id="addToCartForm" onsubmit="preventDefault(event)">
            
           
            <div class="my-4">
              <span class="font-bold text-default-600">Quantity:</span>
              <div class="mt-2 flex gap-3">
                <div class="counter flex w-28 rounded border bg-white">
                  <button class="decrement p-2" type="button" onclick="reduceQuantity()">
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
                    value="1"
                    id="quantityDateInput"
                  />
                  <button class="increment p-2" type="button" onclick="addQuantity()">
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
                <button
                  class="flex items-center gap-2 rounded-lg bg-primary-500 px-5 font-semibold uppercase text-white transition-all duration-300 hover:bg-primary-600"
                  type="submit"
                  onclick="addProduct(${result.productId}, '${result.productName}', '${result.productImage1}')"
                >
                  <svg
                    class="h-4 w-4"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 576 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                    ></path>
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </form>
          <div class="my-4 mb-5 border-b-2 pb-5">
          
          </div>
          <div class="my-4 flex items-center gap-2">
            <span class="font-bold text-default-600">Available:</span>
            <span class="text-xs text-green-400">${result.stockQuantity} items in Stock</span>
          </div>
          <div class="my-4">
            
           
          </div>
          <div class="my-4">
            <span class="font-bold text-default-600">Share on:</span>
            <div class="mt-2 flex items-center gap-2">
              <a
                class="inline-block rounded border border-[#1877f2] px-4 py-2 text-[#1877f2]"
                href="#"
              >
                <svg
                  class="h-4 w-4"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 320 512"
                  height="200px"
                  width="200px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                </svg>
              </a>             
            </div>
          </div>
          <div class="my-4">
          </div>
        </div>`;
}
showProductDetail();

function addProduct(productId, productName, productImage) {
  if (token) {
    addProductToCart(
      productId,
      document.getElementById("quantityDateInput").value
    );
  } else {
    addProductToLocalStorage(productId, productName, productImage);
  }
}

async function addProductToLocalStorage(productId, productName, productImage) {
  let offlineCart = localStorage.getItem("offlineCart");

  // If offlineCart is null or undefined, initialize as an empty array
  if (!offlineCart) {
    offlineCart = "[]";
  }

  // Parse the offlineCart to an array
  offlineCart = JSON.parse(offlineCart);

  // Get the quantity value from the input element
  let quantityInput = document.getElementById("quantityDateInput");
  let quantity = quantityInput ? parseInt(quantityInput.value) : 1; // Default to 1 if no input

  // Check if the product already exists in the offlineCart
  let existingProduct = offlineCart.find(
    (item) => item.productId === productId
  );

  if (existingProduct) {
    // If the product exists, update the quantity
    existingProduct.quantity += quantity;
  } else {
    // If the product doesn't exist, add a new item
    offlineCart.push({
      productId: productId,
      productName: productName,
      productImage: productImage,
      quantity: quantity,
    });
  }

  // Store the updated array in localStorage
  localStorage.setItem("offlineCart", JSON.stringify(offlineCart));
  location.reload();
}

async function addProductToCart(productId, quantity) {
  let url = "https://localhost:44338/api/Cart/addToCart";
  let data = {
    productId: productId,
    quantity: quantity,
  };

  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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

function preventDefault(event) {
  event.preventDefault();
}

async function GetReviews() {
  //review section
  const n = localStorage.getItem("productId");
  const url = `https://localhost:44338/api/Reviews/SingleProductReviews/${n}`;
  var response = await fetch(url);
  var result = await response.json();
  var container = document.getElementById("reviewSection");
  container.innerHTML += `
       <div class="mb-8 flex items-center justify-between border-b-[3px] pb-2">
        <h2
          class="relative text-2xl font-bold text-default-600 after:absolute after:-bottom-[11px] after:left-0 after:h-[3px] after:w-full after:bg-primary-500 after:content-['']"
        >
          Reviews (${result.reviewsCount})
        </h2>
       </div>
       <div class="mb-10 grid grid-cols-3 gap-6">
        <div class="order-1 col-span-3 lg:order-2 lg:col-span-1">
          <h2 class="mb-4 text-xl font-semibold text-default-600">
            Customer reviews
          </h2>
          <div
            class="my-5 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <div class="flex flex-col items-center">
              <span class="w-max text-2xl"
                >${result.overAllRating} / 5,0
                
                <!-- over all rating -->
              </span>
              <div class="rater my-2" data-rater="5"></div>
              <span class="flex items-center gap-1">
                <i class="bi bi-chat-quote flex"></i>
                ${result.reviewsCount} Reviews
                <!-- review count -->
              </span>
            </div>
            <div class="w-full max-w-[600px]">
              <div class="my-2 flex items-center gap-2">
                <span>5</span>
                <div
                  class="relative h-5 w-full overflow-hidden rounded bg-primary-500/50"
                >
                  <div
                    class="absolute left-0 top-0 h-full rounded bg-primary-500 text-center text-white"
                    style="width: ${result.fiveStarReviewsPercentage * 100}%"
                  >
                    ${result.fiveStarReviewsPercentage * result.reviewsCount}
                  </div>
                </div>
              </div>
              <div class="my-2 flex items-center gap-2">
                <span>4</span>
                <div
                  class="relative h-5 w-full overflow-hidden rounded bg-primary-500/50"
                >
                  <div
                    class="absolute left-0 top-0 h-full rounded bg-primary-500 text-center text-white"
                    style="width: ${result.fourStarReviewsPercentage * 100}%"
                  >
                    ${result.fourStarReviewsPercentage * result.reviewsCount}
                  </div>
                </div>
              </div>
              <div class="my-2 flex items-center gap-2">
                <span>3</span>
                <div
                  class="relative h-5 w-full overflow-hidden rounded bg-primary-500/50"
                >
                  <div
                    class="absolute left-0 top-0 h-full w-[30%] rounded bg-primary-500 text-center text-white"
                    style="width: ${result.threeStarReviewsPercentage * 100}%"
                  >
                    ${result.threeStarReviewsPercentage * result.reviewsCount}
                  </div>
                </div>
              </div>
              <div class="my-2 flex items-center gap-2">
                <span>2</span>
                <div
                  class="relative h-5 w-full overflow-hidden rounded bg-primary-500/50"
                >
                  <div
                    class="absolute left-0 top-0 h-full w-[45%] rounded bg-primary-500 text-center text-white"
                    style="width: ${result.twoStarReviewsPercentage * 100}%"
                  >
                    ${result.twoStarReviewsPercentage * result.reviewsCount}
                  </div>
                </div>
              </div>
              <div class="my-2 flex items-center gap-2">
                <span>1</span>
                <div
                  class="relative h-5 w-full overflow-hidden rounded bg-primary-500/50"
                >
                  <div
                    class="absolute left-0 top-0 h-full w-[25%] rounded bg-primary-500 text-center text-white"
                    style="width: ${result.oneStarReviewsPercentage * 100}%"
                  >
                    
                    ${result.oneStarReviewsPercentage * result.reviewsCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        `;
}

function addQuantity() {
  document.getElementById("quantityDateInput").value++;
}

function reduceQuantity() {
  let quantity = document.getElementById("quantityDateInput");
  quantity.value = Math.max(quantity.value - 1, 1);
}

async function loadReviews() {
  const n = localStorage.getItem("productId");
  const url = `https://localhost:44338/api/Reviews/SingleProductReviews/${n}`;
  const response = await fetch(url);
  const result = await response.json();
  // Get the review section container
  var container = document.getElementById("reviewRate");
  // Loop through each review and create HTML
  result.reviews.forEach((review) => {
    container.innerHTML += `
                <div class="order-2 col-span-3 lg:order-1 lg:col-span-2">
                    <div class="mb-10">
                        <div class="mt-5 flex gap-5">
                            <figure
                                class="hidden h-14 w-14 min-w-[56px] overflow-hidden rounded-full shadow-md sm:block"
                            >
                                <img
                                    class="h-full w-full object-cover"
                                    src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                                    alt="profile_logo"
                                />
                            </figure>
                            <div>
                                <div class="flex items-center gap-1">
                                    <a class="font-bold text-primary-500" href="#">
                                        ${
                                          review.userName
                                        } <!-- assuming review contains a userName field -->
                                    </a>
                                    &#183;
                                    <span class="text-xs text-default-300">
                                        ${new Date(
                                          review.createdAt
                                        ).toLocaleString()} <!-- Formatting date -->
                                    </span>
                                </div>
                                <div class="rater my-2" data-rater="${
                                  review.rating
                                }"></div>
                                <p class="my-2">
                                    ${review.comment}
                                </p>
                                <div class="flex items-center gap-3">
                                    <div
                                        class="flex cursor-pointer items-center gap-1 text-sm text-default-600 transition-all duration-300 hover:text-primary-500"
                                    >
                                    </div>
                                    <div
                                        class="flex cursor-pointer items-center gap-1 text-sm text-default-600 transition-all duration-300 hover:text-primary-500"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
  });
}

// foreach--------------------------------------------------------
async function loadReviews1() {
  const n = localStorage.getItem("productId");
  const url = `https://localhost:44338/api/Reviews/SingleProductReviews/${n}`;
  var response = await fetch(url);
  var result = await response.json();
  var container = document.getElementById("userReview");
  container.innerHTML += `
        <div class="order-2 col-span-3 lg:order-1 lg:col-span-2">
                <div class="flex items-center gap-3">
                  <div
                    class="flex cursor-pointer items-center gap-1 text-sm text-default-600 transition-all duration-300 hover:text-primary-500"
                  ></div>
                  <div
                    class="flex cursor-pointer items-center gap-1 text-sm text-default-600 transition-all duration-300 hover:text-primary-500"
                  ></div>
                </div>
              </div>
            </div>`;
}

async function AddReview() {
  const url2 = "https://localhost:44338/api/Reviews/AddReview";
  let comment = document.getElementById("comment");
  var data = {
    userId: localStorage.getItem("userId"),
    comment: comment.value,
    productId: localStorage.getItem("productId"),
    rating: document.getElementById("rating-value").value,
  };
  var resquest = await fetch(url2, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("the comment added successfully");
  location.reload();
}
let form = document.getElementById("createCommentForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  AddReview();
});
GetReviews();
// Call the function to load reviews when the page loads
loadReviews();
loadReviews1();
