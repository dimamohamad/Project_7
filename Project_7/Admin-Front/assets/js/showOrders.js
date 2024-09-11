const url = "https://localhost:44338/api/Orders/allOrders";

async function GetAllCategories() {
  var response = await fetch(url);

  var result = await response.json();

  var container = document.getElementById("showCategoryTable");

  `
  {
    "orderId": 16,
    "address": null,
    "userId": 2,
    "totalAmount": 45,
    "orderDate": "2024-09-09T21:35:08.487",
    "voucherId": null,
    "shippingStatus": "pending",
    "createdAt": "2024-09-09T21:35:08.487",
    "orderItems": [
      {
        "orderitemId": 20,
        "orderId": 16,
        "quantity": 3,
        "totalPrice": 45
      }
    ],
    "payments": [
      {
        "paymentId": 14,
        "orderId": 16,
        "amount": 45,
        "paymentMethod": "Paypal",
        "transactionId": "PAYID-M3PT7VI8WT97947U9928984L",
        "paymentDate": "2024-09-09T21:35:10.29",
        "paymentGateway": "Paypal",
        "status": "approved"
      }
    ],
    "user": null,
    "voucher": null
  },
  {
    "orderId": 17,
    "address": null,
    "userId": 2,
    "totalAmount": 120,
    "orderDate": "2024-09-09T21:38:33.707",
    "voucherId": null,
    "shippingStatus": "pending",
    "createdAt": "2024-09-09T21:38:33.707",
    "orderItems": [
      {
        "orderitemId": 21,
        "orderId": 17,
        "quantity": 8,
        "totalPrice": 120
      }
    ],
    "payments": [
      {
        "paymentId": 15,
        "orderId": 17,
        "amount": 120,
        "paymentMethod": "Paypal",
        "transactionId": "PAYID-M3PUBJI8P699314RA141452T",
        "paymentDate": "2024-09-09T21:38:35.58",
        "paymentGateway": "Paypal",
        "status": "approved"
      }
    ],
    "user": null,
    "voucher": null
  },
  {
    "orderId": 18,
    "address": null,
    "userId": 2,
    "totalAmount": 81,
    "orderDate": "2024-09-09T21:42:01.95",
    "voucherId": 4,
    "shippingStatus": "pending",
    "createdAt": "2024-09-09T21:42:01.95",
    "orderItems": [
      {
        "orderitemId": 22,
        "orderId": 18,
        "quantity": 6,
        "totalPrice": 81
      }
    ],
    "payments": [
      {
        "paymentId": 16,
        "orderId": 18,
        "amount": 81,
        "paymentMethod": "Paypal",
        "transactionId": "PAYID-M3PUC5I8YJ079522P871790E",
        "paymentDate": "2024-09-09T21:42:03.71",
        "paymentGateway": "Paypal",
        "status": "approved"
      }
    ],
    "user": null,
    "voucher": null
  },
  {
    "orderId": 19,
    "address": null,
    "userId": 2,
    "totalAmount": 15,
    "orderDate": "2024-09-09T21:43:41.383",
    "voucherId": null,
    "shippingStatus": "pending",
    "createdAt": "2024-09-09T21:43:41.383",
    "orderItems": [
      {
        "orderitemId": 23,
        "orderId": 19,
        "quantity": 1,
        "totalPrice": 15
      }
    ],
    "payments": [
      {
        "paymentId": 17,
        "orderId": 19,
        "amount": 15,
        "paymentMethod": "Paypal",
        "transactionId": "PAYID-M3PUDVI89T876460D066300C",
        "paymentDate": "2024-09-09T21:43:43.127",
        "paymentGateway": "Paypal",
        "status": "approved"
      }
    ],
    "user": null,
    "voucher": null
  }
]
  `;
  result.forEach((order) => {
    container.innerHTML += `   

   <tr class="position-static">
                      <td class="fs-9 align-middle">
                        ${order.orderId}
                      </td>
                      <td class="align-middle white-space-nowrap py-0"><a class="d-block border border-translucent rounded-2" href="../landing/product-details.html"><img src="https://localhost:44338/${order.user.userImage}" alt="" width="53" /></a></td>
                      <td class="product align-middle ps-4"><a class="fw-semibold line-clamp-3 mb-0" href="../landing/product-details.html">${order.user.userName}</a></td>
                     
                      <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">$${order.totalAmount}</td>
                     
                     
                      <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">${order.createdAt}</td>
                      <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">${order.shippingStatus}</td>

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
  var url = `https://localhost:44338/Api/Categories/DeleteCategory/${categoryId}`;

  let request = await fetch(url, {
    method: "DELETE",
  });
  alert("Category has been deleted successfully");
}
GetAllCategories();
