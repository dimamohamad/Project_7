const url = "https://localhost:44338/api/Orders/allOrders";

async function GetAllCategories() {
  var response = await fetch(url);

  var result = await response.json();

  var container = document.getElementById("showCategoryTable");

  result.forEach((order) => {
    container.innerHTML += `   

   <tr class="position-static">
      <td class="fs-9 align-middle"> ${order.orderId} </td>
      <td class="align-middle white-space-nowrap py-0">
      <a class="d-block border border-translucent rounded-2" href="showSingleOrderes.html?orderId=${order.orderId}"><img src="https://localhost:44338/${order.user.userImage}" alt="" width="53" /></a></td>
      <td class="product align-middle ps-4"><a class="fw-semibold line-clamp-3 mb-0" href="showSingleOrderes.html?orderId=${order.orderId}">${order.user.userName}</a></td>
      <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">$${order.totalAmount}</td>
      <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">${order.createdAt}</td>
      <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">${order.shippingStatus}</td>

    </tr>
        `;
  });

  console.log(result);
}

async function DeleteCategory(categoryId) {
  var url = `https://localhost:44338/Api/Categories/DeleteCategory/${categoryId}`;

  let request = await fetch(url, {
    method: "DELETE",
  });
  alert("Category has been deleted successfully");
}
GetAllCategories();
