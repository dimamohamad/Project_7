const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

const url = `https://localhost:44338/api/Orders/${orderId}`;

async function GetAllCategories() {
  var response = await fetch(url);
  var result = await response.json();

  var container = document.getElementById("showCategoryTable");

  result.orderItems.forEach((orderItem) => {
    container.innerHTML += `   
      <tr class="position-static">
        <td class="fs-9 align-middle">
          ${orderItem.product.productId} <!-- Product ID -->
        </td>
        <td class="align-middle white-space-nowrap py-0">
          <a class="d-block border border-translucent rounded-2" href="../landing/product-details.html">
            <img src="https://localhost:44338/${
              orderItem.product.productImage1
            }" alt="" width="53" />
          </a>
        </td>
        <td class="product align-middle ps-4">
          <a class="fw-semibold line-clamp-3 mb-0" href="../landing/product-details.html">
            ${orderItem.product.productName} <!-- Product Name -->
          </a>
        </td>
        <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">
          $${orderItem.product.price} <!-- Single Product Price -->
        </td>
                <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">
          ${orderItem.quantity} <!-- Quantity -->
        </td>
        <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">
          $${orderItem.totalPrice} <!-- Total Price (Quantity x Price) -->
        </td>
        <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">
          ${new Date(result.createdAt).toLocaleDateString()} <!-- Order Date -->
        </td>
        <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">
          ${result.shippingStatus} <!-- Shipping Status -->
        </td>
      </tr>
    `;
  });

  console.log(result);
}

GetAllCategories();
