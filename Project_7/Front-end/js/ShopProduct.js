const n = localStorage.getItem("CategoryId");
debugger;
var url;
if (n) {
  url = `https://localhost:44339/Api/Products/GetProductsByCategoryId/${n}`;
} else {
  url = "https://localhost:44339/Api/Products/GetAllProducts";
}
async function GetProducts() {
  var response = await fetch(url);

  var result = await response.json();

  var container = document.getElementById("showAllProductContainer");

  result.forEach((product) => {
    container.innerHTML += `    
                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <div
                class="relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl">
                <a href="#" class="block h-[270px]">
                  <img
                    class="h-full w-full object-contain"
                    src="https://localhost:44339/${product.productImage1}"
                    alt="img" />
                </a>
                <div class="mt-2 flex gap-1 px-5">
                  <a
                    href="#"
                    class="h-4 w-4 rounded-full border border-slate-400 bg-red-400"></a>
                  <a
                    href="#"
                    class="h-4 w-4 rounded-full border border-slate-400 bg-blue-400"></a>
                  <a
                    href="#"
                    class="h-4 w-4 rounded-full border border-slate-400 bg-gray-500"></a>
                </div>
                <div class="mt-2 px-5">
                  <div class="border-t border-slate-300">
                    <div class="rater my-2" data-rater="5"></div>
                    <a
                      href="#"
                      class="my-2 line-clamp-2 text-default-600 transition-all duration-300 hover:text-primary-500">
                      ${product.productName}
                    </a>
                    <span
                      class="mb-2 inline-block text-base font-bold text-primary-500">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <a
                  onclick = "getProductId(${product.productId})"
                  href = "product-details.html"
                  class="mx-5 mb-5 mt-auto w-fit rounded-md bg-primary-500 px-3 py-2 uppercase text-white transition-all duration-300 hover:bg-primary-600">
                  View details
                </a>
                <div class="absolute right-4 top-4 z-[2] flex flex-col gap-2">
                  <button class="btn-wishlist hover:text-primary-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="pointer-events-none h-6 w-6 fill-none">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                
                </div>
                <span
                  class="pointer-events-none absolute left-4 top-4 rounded-md bg-primary-500 px-2 text-white">
                  New
                </span>
              </div>
            </div>
    `;
  });
}

// function clic11k(id) {
//   localStorage.setItem("productid", id);
//   window.location.href = "../products/details.html";
// }

function getProductId(id) {
  localStorage.setItem("productId", id);
}

// function myfun1() {
//   window.location.href = "../Products/addproduct.html";
// }

// async function deleteProduct(productId) {
//   var url = `https://localhost:44358/api/Products/DeleteProduct/${productId}`;
//   let request = await fetch(url, {
//     method: "DELETE",
//   });
//   alert("Product Deleted");
//   window.location.href = "ShowProduct.html";
// }

async function showProductDetail() {
  const x = localStorage.getItem("productId");
  var url = `https://localhost:44339/Api/Products/GetProductsById/${x}`;

  var response = await fetch(url);

  var result = await response.json();

  var container = document.getElementById("productDetailsPopUp");

  container.innerHTML = `   
 
      <div
        class="modal-content modal-center-top flex w-[1000px] min-w-[250px] flex-col rounded-lg bg-[#f5f7fe] p-6"
      >
        <button
          class="close-modal absolute right-0 top-0 p-2 transition-all duration-300 lg:right-[-10px] lg:top-[-10px] lg:rounded-lg lg:bg-primary-500 lg:text-white lg:hover:bg-primary-400"
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
        <div class="grid grid-cols-6 gap-6">
          <div
            class="col-span-6 flex max-h-[500px] w-full flex-col gap-4 lg:col-span-3 lg:flex-row"
          >
            <div
              class="swiper swiper-product relative order-1 flex w-full flex-1 items-center overflow-hidden rounded-lg lg:order-2"
            >
              <div class="swiper-wrapper">
                <figure class="swiper-slide">
                  <img src="img/product/color1.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product1.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product2.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product3.png" alt="" />
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
                  <img
                    src="https://localhost:44339/${result.productImage1}"
                    alt=""
                  />
                </figure>
                <figure class="swiper-slide">
                  <img
                    src="https://localhost:44339/${result.productImage2}"
                    alt=""
                  />
                </figure>
                <figure class="swiper-slide">
                  <img
                    src="https://localhost:44339/${result.productImage3}"
                    alt=""
                  />
                </figure>
                <figure class="swiper-slide">
                  <img
                    src="https://localhost:44339/${result.productImage4}"
                    alt=""
                  />
                </figure>
                <figure class="swiper-slide">
                  <img
                    src="https://localhost:44339/${result.productImage5}"
                    alt=""
                  />
                </figure>
                <figure class="swiper-slide">
                  <img
                    src="https://localhost:44339/${result.productImage6}"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
          <div class="col-span-6 lg:col-span-3">
            <div class="mb-2 flex items-center justify-between gap-5">
              <div class="flex items-center gap-1">
                <div class="rater my-2" data-rater="5"></div>
                <small class="text-default-300">(2)</small>
              </div>
              <span class="rounded bg-green-400 px-2 py-1 text-white">
                In Stock
              </span>
            </div>
            <h1 class="text-2xl font-semibold text-default-600">
              ${result.productName}
            </h1>
            <div class="my-2 flex items-center gap-2">
              <span class="text-xl font-bold text-primary-500"
                >${result.price}</span
              >
            </div>
            <div class="mb-5 border-b-2 pb-5">
              <p class="line-clamp-3">${result.description}</p>
            </div>
            <form>
              <div class="my-4">
                <span class="font-bold text-default-600">Quantity:</span>
                <div class="mt-2 flex gap-3">
                  <div class="counter flex w-28 rounded border bg-white">
                    <button class="decrement p-2" type="button">
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
                      value="0"
                    />
                    <button class="increment p-2" type="button">
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
              <button
                class="btn-wishlist flex items-center gap-2 transition-all duration-300 hover:text-primary-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="pointer-events-none h-6 w-6 fill-none"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  ></path>
                </svg>
                <span class="pointer-events-none">Add to wishlist</span>
              </button>
            </div>
            <div class="my-4 flex items-center gap-2">
              <span class="font-bold text-default-600">Available:</span>
              <span class="text-xs text-green-400">20 items in Stock</span>
            </div>
            <div class="my-4">
              <span class="mr-1 font-bold text-default-600">Category:</span>
              <a
                class="transition-all duration-300 hover:text-primary-500"
                href="#"
              >
                Virtual Assistants
              </a>
            </div>
            <div class="my-4">
              <span class="mr-1 font-bold text-default-600">Tags:</span>
              <a
                class="mr-1 transition-all duration-300 hover:text-primary-500"
                href="#"
              >
                Audio,
              </a>
              <a
                class="transition-all duration-300 hover:text-primary-500"
                href="#"
              >
                Virtual Assistants
              </a>
            </div>
            <div class="my-4">
              <span class="font-bold text-default-600">Share:</span>
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
                <a
                  class="inline-block rounded border border-black px-4 py-2 text-black"
                  href="#"
                >
                  <svg
                    class="h-4 w-4"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                    ></path>
                  </svg>
                </a>
                <a
                  class="inline-block rounded border border-[#25D366] px-4 py-2 text-[#25D366]"
                  href="#"
                >
                  <svg
                    class="h-4 w-4"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    ></path>
                  </svg>
                </a>
                <a
                  class="inline-block rounded border border-primary-500 px-4 py-2 text-primary-500"
                  href="#"
                >
                  <svg
                    class="h-4 w-4"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div
        class="modal-content modal-center-top flex w-[1000px] min-w-[250px] flex-col rounded-lg bg-[#f5f7fe] p-6"
      >
        <button
          class="close-modal absolute right-0 top-0 p-2 transition-all duration-300 lg:right-[-10px] lg:top-[-10px] lg:rounded-lg lg:bg-primary-500 lg:text-white lg:hover:bg-primary-400"
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
        <div class="grid grid-cols-6 gap-6">
          <div
            class="col-span-6 flex max-h-[500px] w-full flex-col gap-4 lg:col-span-3 lg:flex-row"
          >
            <div
              class="swiper swiper-product relative order-1 flex w-full flex-1 items-center overflow-hidden rounded-lg lg:order-2"
            >
              <div class="swiper-wrapper">
                <figure class="swiper-slide">
                  <img src="img/product/color1.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product1.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product2.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product3.png" alt="" />
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
                  <img src="img/product/color1.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product1.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product2.png" alt="" />
                </figure>
                <figure class="swiper-slide">
                  <img src="img/product/product3.png" alt="" />
                </figure>
              </div>
            </div>
          </div>
          <div class="col-span-6 lg:col-span-3">
            <div class="mb-2 flex items-center justify-between gap-5">
              <div class="flex items-center gap-1">
                <div class="rater my-2" data-rater="5"></div>
                <small class="text-default-300">(2)</small>
              </div>
              <span class="rounded bg-green-400 px-2 py-1 text-white">
                In Stock
              </span>
            </div>
            <h1 class="text-2xl font-semibold text-default-600">
              Amazon Echo Dot 5th Gen - Deep sea blue
            </h1>
            <div class="my-2 flex items-center gap-2">
              <span class="text-xl font-bold text-primary-500">$67.48</span>
              <span class="line-through">$89.98</span>
              <span class="rounded-md bg-red-400 px-2 text-white">
                -25% off
              </span>
            </div>
            <div class="mb-5 border-b-2 pb-5">
              <p class="line-clamp-3">
                Introducing Amazon Echo Dot 5th Gen in a stylish deep sea blue
                color, the perfect smart speaker for your home. With its 15 W of
                power you will enjoy clear, high-quality sound in any
                environment. Thanks to the virtual assistant Alexa you can
                control your music, home devices and obtain useful information
                just with your voice. In addition, its touch control function
                gives you a more comfortable and intuitive user experience.
              </p>
            </div>
            <form>
              <div class="my-4">
                <span class="font-bold text-default-600">Size:</span>
                <ul class="mt-2 flex flex-wrap gap-3">
                  <li class="relative">
                    <input
                      class="peer sr-only"
                      type="radio"
                      value=""
                      name="size"
                      id="size1"
                      checked=""
                    />
                    <label
                      class="block cursor-pointer select-none rounded border bg-white px-3 py-1 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-primary-500"
                      for="size1"
                    >
                      S
                    </label>
                  </li>
                  <li class="relative">
                    <input
                      class="peer sr-only"
                      type="radio"
                      value=""
                      name="size"
                      id="size2"
                    />
                    <label
                      class="block cursor-pointer select-none rounded border bg-white px-3 py-1 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-primary-500"
                      for="size2"
                    >
                      M
                    </label>
                  </li>
                  <li class="relative">
                    <input
                      class="peer sr-only"
                      type="radio"
                      value=""
                      name="size"
                      id="size3"
                    />
                    <label
                      class="block cursor-pointer select-none rounded border bg-white px-3 py-1 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-primary-500"
                      for="size3"
                    >
                      L
                    </label>
                  </li>
                  <li class="relative">
                    <input
                      class="peer sr-only"
                      type="radio"
                      value=""
                      name="size"
                      id="size4"
                    />
                    <label
                      class="block cursor-pointer select-none rounded border bg-white px-3 py-1 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-primary-500"
                      for="size4"
                    >
                      XL
                    </label>
                  </li>
                </ul>
              </div>
              <div class="my-4">
                <span class="font-bold text-default-600">Colors:</span>
                <ul class="mt-2 flex flex-wrap gap-3">
                  <li class="relative">
                    <input
                      class="peer sr-only"
                      type="radio"
                      value=""
                      name="color"
                      id="color2"
                    />
                    <label
                      class="flex cursor-pointer select-none items-center gap-2 rounded border bg-white px-3 py-1 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-primary-500"
                      for="color2"
                    >
                      <span class="h-9 w-9 overflow-hidden rounded">
                        <img
                          class="h-full w-full object-cover"
                          src="img/product/color2.png"
                          alt=""
                        />
                      </span>
                      <span class="font-semibold">Charcoal</span>
                    </label>
                  </li>
                  <li class="relative">
                    <input
                      class="peer sr-only"
                      type="radio"
                      value=""
                      name="color"
                      id="color1"
                      checked=""
                    />
                    <label
                      class="flex cursor-pointer select-none items-center gap-2 rounded border bg-white px-3 py-1 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-primary-500"
                      for="color1"
                    >
                      <span class="h-9 w-9 overflow-hidden rounded">
                        <img
                          class="h-full w-full object-cover"
                          src="img/product/color1.png"
                          alt=""
                        />
                      </span>
                      <span class="font-semibold">Deep sea blue</span>
                    </label>
                  </li>
                  <li class="relative">
                    <input
                      class="peer sr-only"
                      type="radio"
                      value=""
                      name="color"
                      id="color3"
                    />
                    <label
                      class="flex cursor-pointer select-none items-center gap-2 rounded border bg-white px-3 py-1 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-1 peer-checked:ring-primary-500"
                      for="color3"
                    >
                      <span class="h-9 w-9 overflow-hidden rounded">
                        <img
                          class="h-full w-full object-cover"
                          src="img/product/color3.png"
                          alt=""
                        />
                      </span>
                      <span class="font-semibold">Glacier White</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div class="my-4">
                <span class="font-bold text-default-600">Quantity:</span>
                <div class="mt-2 flex gap-3">
                  <div class="counter flex w-28 rounded border bg-white">
                    <button class="decrement p-2" type="button">
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
                      value="0"
                    />
                    <button class="increment p-2" type="button">
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
              <button
                class="btn-wishlist flex items-center gap-2 transition-all duration-300 hover:text-primary-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="pointer-events-none h-6 w-6 fill-none"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  ></path>
                </svg>
                <span class="pointer-events-none">Add to wishlist</span>
              </button>
            </div>
            <div class="my-4 flex items-center gap-2">
              <span class="font-bold text-default-600">Available:</span>
              <span class="text-xs text-green-400">20 items in Stock</span>
            </div>
            <div class="my-4">
              <span class="mr-1 font-bold text-default-600">Category:</span>
              <a
                class="transition-all duration-300 hover:text-primary-500"
                href="#"
              >
                Virtual Assistants
              </a>
            </div>
            <div class="my-4">
              <span class="mr-1 font-bold text-default-600">Tags:</span>
              <a
                class="mr-1 transition-all duration-300 hover:text-primary-500"
                href="#"
              >
                Audio,
              </a>
              <a
                class="transition-all duration-300 hover:text-primary-500"
                href="#"
              >
                Virtual Assistants
              </a>
            </div>
            <div class="my-4">
              <span class="font-bold text-default-600">Share:</span>
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
                <a
                  class="inline-block rounded border border-black px-4 py-2 text-black"
                  href="#"
                >
                  <svg
                    class="h-4 w-4"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                    ></path>
                  </svg>
                </a>
                <a
                  class="inline-block rounded border border-[#25D366] px-4 py-2 text-[#25D366]"
                  href="#"
                >
                  <svg
                    class="h-4 w-4"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 448 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                    ></path>
                  </svg>
                </a>
                <a
                  class="inline-block rounded border border-primary-500 px-4 py-2 text-primary-500"
                  href="#"
                >
                  <svg
                    class="h-4 w-4"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
     
    ;`;
}
GetProducts();
