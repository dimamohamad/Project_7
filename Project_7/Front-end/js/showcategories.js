
var url;


  url = "https://localhost:44338/API/Categories/GetAllCategories";

async function Getcategories() {
  var response = await fetch(url);

  var result = await response.json();

  var container = document.getElementById("showAllcategories");

  result.forEach((product) => {
    container.innerHTML += `    
      
         <div class="col-span-6 sm:col-span-3 lg:col-span-2">
            <a
                  onclick = "storeCategoryId(${product.categoryId})"
                  href = "shop-grid.html">
                 
             <div
                class="relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl">
               
                  <img
                    class="h-full w-full object-contain"
                    src="https://localhost:44338/${product.categoryImage}"
                    alt="img" />
            
                <div  style="text-align: center;" class="flex gap-1 px-5">
                <b> ${product.categoryName}</b>
                  
                </div>
                
             
             
             </div>
              
         </div>
          </a>

          
    `;
  });
}

// function clic11k(id) {
//   localStorage.setItem("productid", id);
//   window.location.href = "../products/details.html";
// }



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


Getcategories();

///for Navbar

// async function GetCategories() {
//   var response = await fetch(
//     "https://localhost:44338/API/Categories/GetAllCategories"
//   );
//   var result = await response.json();
//   var container = document.getElementById("dropDownCategory");
//   result.forEach((element) => {
//     container.innerHTML += `
//              <li>
//                     <a
//                       class="block px-6 py-2 transition-all duration-300 hover:text-primary-500"
//                       href="shop-grid.html"
//                       onclick="storeCategoryId(${element.categoryId})"
//                     >
//                        ${element.categoryName}
//                     </a>
//                   </li>
//     `;
//   });
// }
function storeCategoryId(categoryId) {
  localStorage.setItem("CategoryId", categoryId);
  window.location.href = "shop-grid.html";
}

