document.addEventListener("DOMContentLoaded", (event) => {
  // Load user ID from local storage
  const userId = localStorage.getItem("userId");
  if (userId) {
    fetchUserData(userId);
  }

  // Add event listener for file input change
  document.getElementById("fileInput").addEventListener("change", previewImage);
});

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById("profileImage");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function fetchUserData(id) {
  fetch(`https://localhost:44338/api/Users/ShowUserByID/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("fname").value = data.firstName || "";
      document.getElementById("lname").value = data.lastName || "";
      document.getElementById("username").value = data.userName || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("phonenum").value = data.phoneNumber || "";
      document.getElementById("profileImage").src =
        `https://localhost:44338/${data.userImage}` ||
        "https://via.placeholder.com/150";
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

function saveChanges() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("No user ID found in local storage.");
    return;
  }

  const formData = new FormData();
  formData.append("FirstName", document.getElementById("fname").value);
  formData.append("LastName", document.getElementById("lname").value);
  formData.append("UserName", document.getElementById("username").value);
  formData.append("Email", document.getElementById("email").value);
  formData.append("PhoneNumber", document.getElementById("phonenum").value);
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length > 0) {
    formData.append("UserImage", fileInput.files[0]);
  }

  fetch(`https://localhost:44338/api/Users/UpdateUser/${userId}`, {
    method: "PUT",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("User data updated successfully.");
    })
    .catch((error) => console.error("Error updating user data:", error));
}

function deleteAccount() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("No user ID found in local storage.");
    return;
  }

  fetch(`https://localhost:44338/api/Users/DeleteUser/${userId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Account deleted successfully.");
      localStorage.removeItem("userId");
      window.location.href = "/Login/Login.html";
    })
    .catch((error) => console.error("Error deleting user account:", error));
}
///////////////////////
// Function to fetch and display all orders
async function getAllOrders() {
  try {
    // Fetch user info including orders from API
    let response = await fetch(
      "https://localhost:44338/api/Users/getCurrentUserInfo",
      {
        headers: {
          Authorization: `Bearer ${localStorage.Token}`,
        },
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json(); // Parse the response JSON
    console.log(data); // Inspect the structure of the response object

    const orderContainer = document.getElementById("OrderData");
    orderContainer.innerHTML = ""; // Clear previous orders, if any

    // Iterate over orders and orderItems
    data.orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        let orderHTML = `
          <div
            class="mix mix-all mix-processing relative block rounded-lg bg-white p-4 shadow"
            href="javascript:void(0)"
            data-target=".modal-order"
          >
            <div
              class=" flex flex-col gap-5 sm:flex-row"
            >
              <div class="relative h-[80px] w-[80px] min-w-[80px]">
                <figure
                  class="h-full w-full overflow-hidden rounded-lg border bg-white"
                >
                  <img
                    class="h-full w-full object-cover"
                    src="https://localhost:44338/${
                      item.product.productImage1
                    }"  <!-- product image -->
                    alt="${
                      item.product.productName
                    }"  <!-- product name as alt -->
                  />
                </figure>
                <!-- Assuming you have a second product image in the DB -->
               
              </div>
              <div class="flex flex-col justify-between">
                <h2
                  class="line-clamp-2 break-all text-lg font-semibold text-default-600"
                >
                  ${item.product.productName}  <!-- product name -->
                </h2>
                <div class="my-2 flex items-center gap-1 text-xs">
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
                    <rect
                      width="416"
                      height="384"
                      x="48"
                      y="80"
                      fill="none"
                      stroke-linejoin="round"
                      stroke-width="32"
                      rx="48"
                    ></rect>
                    <circle cx="296" cy="232" r="24"></circle>
                    <circle cx="376" cy="232" r="24"></circle>
                    <circle cx="296" cy="312" r="24"></circle>
                    <circle cx="376" cy="312" r="24"></circle>
                    <circle cx="136" cy="312" r="24"></circle>
                    <circle cx="216" cy="312" r="24"></circle>
                    <circle cx="136" cy="392" r="24"></circle>
                    <circle cx="216" cy="392" r="24"></circle>
                    <circle cx="296" cy="392" r="24"></circle>
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M128 48v32m256-32v32"
                    ></path>
                    <path
                      fill="none"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M464 160H48"
                    ></path>
                  </svg>
                  <span>${new Date(
                    order.createdAt
                  ).toLocaleDateString()}</span>  <!-- order creation date -->
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-light">Transaction. ID</span>
                  <span class="text-sm font-semibold text-default-600">
                    ${
                      order.payments[0].transactionId
                    }  <!-- payment transaction ID -->
                  </span>
                </div>
              </div>
              <div class="mt-auto flex flex-col sm:ml-auto">
                <span class="whitespace-nowrap text-xs font-light">
                  Total Payment
                </span>
                <span class="text-sm font-semibold text-default-600">
                  $${item.totalPrice}  <!-- total price for the order item -->
                </span>
              </div>
              <span
                class="absolute right-0 top-0 m-2 rounded-xl bg-yellow-200 px-2 py-px text-yellow-500"
              >Shipping: ${order.shippingStatus}  <!-- shipping status -->
              </span>
              <button class="download-btn btn btn-primary" onclick="downloadOrder(${
                item.orderId
              })">
                    <i class="fa fa-download"></i> Download
                  </button>
            </div>
          </div>
          
        `;

        // Append the generated HTML to the order container
        orderContainer.innerHTML += orderHTML;
      });
    });
  } catch (error) {
    console.error("Failed to fetch orders: ", error);
  }
}

// Add event listener to the "My Orders" tab
document.addEventListener("DOMContentLoaded", () => {
  // Get the <li> element by its id
  const myOrdersTab = document.getElementById("myOrdersTab");

  // Add a click event listener to the <li> element
  myOrdersTab.addEventListener("click", () => {
    // Call the function to fetch and display the orders
    getAllOrders();
  });
});

async function downloadOrder(orderId) {
  const url = `https://localhost:44338/api/Users/GenerateInvoice?orderId=${orderId}`;

  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice_${orderId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/////////////////////////////////////////////
let addressForm = document.getElementById("EditAddressForm");
addressForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let address = {
    address: document.getElementById("input-address").value,
  };
  let token = localStorage.Token;
  let response = await fetch("https://localhost:44338/api/Users/EditAddress", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(address),
  });
  if (response.ok) {
    alert("Address Updated!");
  } else {
    alert("Something went wrong!");
  }
});
