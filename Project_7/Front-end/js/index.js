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
                      href="shop-mixed.html"
                    >
                       ${element.categoryName}
                    </a>
                  </li>
            
    `;
  });
}
GetCategories();
