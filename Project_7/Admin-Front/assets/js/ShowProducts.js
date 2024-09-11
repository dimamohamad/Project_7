async function getCategoryName() {
  const dropDown = document.getElementById("dropDownListCategory");
  let url = "https://localhost:44338/API/Categories/GetAllCategories";
  let request = await fetch(url);
  let data = await request.json();

  data.forEach((select) => {
    dropDown.innerHTML += `
    
   <li value="${select.categoryId}"><a onclick=setCatid(${select.categoryId}) href="#">${select.categoryName}</a></li>
  `;
  });
}

function setCatid(categoryId) {
  localStorage.setItem("categoryId", categoryId);
}
getCategoryName();
debugger;
const n = localStorage.getItem("categoryId");
var url;
if (n) {
  url = `https://localhost:44338/Api/Products/GetProductsByCategoryId/${n}`;
} else {
  url = "https://localhost:44338/Api/Products/GetAllProducts";
}
async function GetProducts() {
  var response = await fetch(url);

  var result = await response.json();

  var container = document.getElementById("ShowAllProructTable");

  result.forEach((product) => {
    container.innerHTML += `    
     <tr class="position-static">
                      <td class="fs-9 align-middle">
                       ${product.productId}
                      </td>
                      <td class="align-middle white-space-nowrap py-0"><a class="d-block border border-translucent rounded-2" href="../landing/product-details.html"><img src="https://localhost:44338/${product.productImage1}" alt="" width="53" /></a></td>
                      <td class="product align-middle ps-4">${product.productName}</td>
                      <td class="price align-middle white-space-nowrap text-end fw-bold text-body-tertiary ps-4">${product.price}</td>
                      <td class="category align-middle white-space-nowrap text-body-quaternary fs-9 ps-4 fw-semibold">${product.categoryId}</td>
                      <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;"><a class="text-decoration-none" href="#!"></a>${product.description}</td>
                      <td class="align-middle review fs-8 text-center ps-4">
                        <div class="d-toggle-container">
                          <div class="d-block-hover"><span class="fas fa-star text-warning"></span></div>
                          <div class="d-none-hover"><span class="far fa-star text-warning"></span></div>
                        </div>
                      </td>
                      
                      <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">${product.createdAt}</td>
                     <td class="align-middle white-space-nowrap text-end pe-0 ps-4 btn-reveal-trigger">
                        <div class="btn-reveal-trigger position-static"><button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                          <div class="dropdown-menu dropdown-menu-end py-2"><a class="dropdown-item" href="UpdateProducts.html" onclick="UpdateProducts(${product.productId})">Update Category</a>
                            <div class="dropdown-divider"></div><a onclick="DeleteCategory(${product.productId})" class="dropdown-item text-danger" href="#!">Remove</a>
                          </div>
                        </div>
                      </td>
                    </tr>
    `;
  });
}

function UpdateProducts(id) {
  localStorage.setItem("productId", id);
  window.location.href = "UpdateProducts.html";
}

async function DeleteCategory(productid) {
  var url = `https://localhost:44338/Api/Products/DeleteProduct/${productid}`;

  let request = await fetch(url, {
    method: "DELETE",
  });
  alert("Category has been deleted successfully");
  window.location.reload();
}
GetProducts();
