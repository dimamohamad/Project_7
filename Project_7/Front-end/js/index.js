const url = "https://localhost:44339/API/Categories/GetAllCategories";
debugger;
async function GetAllCategories() {
  debugger;
  var response = await fetch(url);
  var result = await response.json();
  var container = document.getElementById("categoryContainer");
  result.forEach((element) => {
    container.innerHTML += `
            <div class="swiper-slide text-center">
                <a class="inline-block font-semibold text-white" href="#">
                  <figure
                    class="mb-2 h-[300px] w-[300px] overflow-hidden rounded-full bg-white p-2 sm:h-36 sm:w-36"
                  >
                    <img
                      class="h-full w-full object-contain"
                      src="https://localhost:44339/${element.categoryImage}"
                      alt="img"
                    />
                  </figure>
                  ${element.categoryName}
                </a>
              </div>
            
    `;
  });
}
GetAllCategories();

debugger;
async function GetCategories() {
  debugger;
  var response = await fetch(url);
  var result = await response.json();
  var container = document.getElementById("dropDownCategory");
  result.forEach((element) => {
    container.innerHTML += `
             <li>
                    <a
                      class="block px-6 py-2 transition-all duration-300 hover:text-primary-500"
                      href="shop-grid.html"
                      onclick="storeCategoryId(${element.categoryId})"
                    >
                       ${element.categoryName}
                    </a>
                  </li>
            
    `;
  });
}
function storeCategoryId(categoryId) {
  localStorage.setItem("CategoryId", categoryId);
  window.location.href("shop-grid.html");
}
GetCategories();

//for new product section
async function GetLatestProducts() {
  const urll = "https://localhost:44339/api/Products/GetLatestProducts";
  var response = await fetch(urll);
  var LatestProducts = await response.json();

  var swiperWrapper = document.getElementById("LatestProducts");

  LatestProducts.forEach((product) => {
    console.log(product);

    swiperWrapper.innerHTML += `
      <div class="swiper-slide h-auto">
        <div class="relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl">
          <a href="#" class="block h-[270px]">
            <img class="h-full w-full object-contain" src="https://localhost:44339/${
              product.productImage1
            }" alt="img"/>
          </a>
          <div class="mt-2 flex gap-1 px-5">
          ${product.rating}
          </div>
          <div class="mt-2 flex gap-1 px-5">
    <div class="rating">
        ${Array.from(
          { length: 5 },
          (_, i) => `
            <label ${i < product.rating ? 'style="color: gold;"' : ""}>
                &#9733;
            </label>
        `
        ).join("")}
    </div>
</div>
          <div class="mt-2 px-5">
            <div class="border-t border-slate-300">
              <div class="rater my-2" data-rater="5"></div>
              <a href="#" class="my-2 line-clamp-2 text-default-600 transition-all duration-300 hover:text-primary-500">
                ${product.productName}
              </a>
              <span class="mb-2 inline-block text-base font-bold text-primary-500">
                $${product.price}
              </span>
            </div>
          </div>
          
                  <button   class="mx-5 mb-5 mt-auto w-fit rounded-md bg-primary-500 px-3 py-2 uppercase text-white transition-all duration-300 hover:bg-primary-600"
" onclick="storeproductId(${product.productId})">   View details</button>



          <div class="absolute right-4 top-4 z-[2] flex flex-col gap-2">
            <button class="btn-wishlist hover:text-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="pointer-events-none h-6 w-6 fill-none">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
              </svg>
            </button>
            <button class="hover:text-primary-500" data-target=".modal-product">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="pointer-events-none h-6 w-6">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
          <span class="pointer-events-none absolute left-4 top-4 rounded-md bg-primary-500 px-2 text-white">
            New
          </span>
        </div>
      </div>`;
  });
}
function storeproductId(productId) {
  localStorage.setItem("productId", productId);
  window.location.href = "/productDetails/productDetails.html";
}
GetLatestProducts();

////////////////////// Most Review
async function GetProductsMostReview() {
  const urlll = "https://localhost:44339/api/Products/productsWithRatings";
  var response = await fetch(urlll);
  var data = await response.json();

  var MostRevieww = document.getElementById("MostReview");

  data.forEach((productMostReview) => {
    MostRevieww.innerHTML += `
      <div class="swiper-slide grid grid-cols-6 gap-5">
          <div class="relative col-span-6 flex rounded-lg bg-white p-4 shadow">
              <a href="#">
                  <figure class="h-[80px] w-[80px] min-w-[80px] xl:h-[130px] xl:w-[130px] xl:min-w-[130px]">
                      <img class="h-full w-full object-contain" src="${
                        productMostReview.productImage1
                      }" alt="(image not found)" />
                  </figure>
              </a>
              <div class="relative border-l-2 pl-4">
                  <div class="rating mt-2 flex gap-1 px-5">
                      ${Array.from(
                        { length: 5 },
                        (_, i) => `
                        <label ${
                          i < productMostReview.rating
                            ? 'style="color: gold;"'
                            : ""
                        }>
                            &#9733;
                        </label>
                    `
                      ).join("")}
                  </div>
                  <a href="#" class="my-3 line-clamp-2 text-default-600 transition-all duration-300 hover:text-primary-500">
                      ${productMostReview.productName}
                  </a>
                  <span class="mb-2 inline-block text-base font-bold text-primary-500">
                      $${productMostReview.price}
                  </span>
              </div>
          </div>
      </div>
    `;
  });
}

GetProductsMostReview();

function clearLocalStorage() {
  localStorage.clear();
  window.location.href = "shop-grid.html";
}
