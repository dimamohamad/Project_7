const url = "https://localhost:44339/API/Categories/GetAllCategories";

async function GetAllCategories() {
  var response = await fetch(url);

  var result = await response.json();

  var container = document.getElementById("showCategoryTable");

  result.forEach((category) => {
    container.innerHTML += `   

   <tr class="position-static">
                      <td class="fs-9 align-middle">
                        <div class="form-check mb-0 fs-8"><input class="form-check-input" type="checkbox" data-bulk-select-row='{"product":"Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands...","productImage":"/products/1.png","price":"$39","category":"Plants","tags":["Health","Exercise","Discipline","Lifestyle","Fitness"],"star":false,"vendor":"Blue Olive Plant sellers. Inc","publishedOn":"Nov 12, 10:45 PM"}' /></div>
                      </td>
                      <td class="align-middle white-space-nowrap py-0"><a class="d-block border border-translucent rounded-2" href="../landing/product-details.html"><img src="https://localhost:44339/${category.categoryImage}" alt="" width="53" /></a></td>
                      <td class="product align-middle ps-4"><a class="fw-semibold line-clamp-3 mb-0" href="../landing/product-details.html">${category.categoryName}</a></td>
                     
                      <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">${category.description}</td>
                     
                     
                      <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">Nov 12, 10:45 PM${category.createdAt}</td>
                      <td class="align-middle white-space-nowrap text-end pe-0 ps-4 btn-reveal-trigger">
                        <div class="btn-reveal-trigger position-static"><button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                          <div class="dropdown-menu dropdown-menu-end py-2"><a class="dropdown-item" href="UpdateCategory.html" onclick="UpdateCategory(${category.categoryId})">Update Category</a>
                            <div class="dropdown-divider"></div><a onclick="DeleteCategory(${category.categoryId})" class="dropdown-item text-danger" href="#!">Remove</a>
                          </div>
                        </div>
                      </td>
                    </tr>


        `;
  });

  console.log(result);
}

// function clic11k(id){
// debugger
//     localStorage.categoryId=id;

//       };

function UpdateCategory(id) {
  localStorage.setItem("CategoryId", id);
  window.location.href = "UpdateCategory.html";
}

async function DeleteCategory(categoryId) {
  var url = `https://localhost:44339/Api/Categories/DeleteCategory/${categoryId}`;

  let request = await fetch(url, {
    method: "DELETE",
  });
  alert("Category has been deleted successfully");
}
GetAllCategories();