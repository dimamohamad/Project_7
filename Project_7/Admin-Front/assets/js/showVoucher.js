const url = "https://localhost:44339/api/Vouchers";

async function GetAllVouchers() {
  var response = await fetch(url);

  var result = await response.json();

  var container = document.getElementById("showVoucherTable");

  result.forEach((voucher) => {
    container.innerHTML += `   

                <tr class="position-static">
                      <td class="fs-9 align-middle">
                        ${voucher.voucherId}
                      </td>
                    
                      <td class="product align-middle ps-4">${voucher.voucherCode}</td>
                     

                      <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">${voucher.discountPercentage}</td>
                     
                     
                      <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">${voucher.startDate}</td>
                      <td class="time align-middle white-space-nowrap text-body-tertiary text-opacity-85 ps-4">${voucher.endDate}</td>
                      <td class="align-middle white-space-nowrap text-end pe-0 ps-4 btn-reveal-trigger">
                        <div class="btn-reveal-trigger position-static"><button class="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10" type="button" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                          <div class="dropdown-menu dropdown-menu-end py-2"><a class="dropdown-item" href="UpdateCategory.html" onclick="UpdateVoucher(${voucher.voucherId})">Edit </a>
                            <div class="dropdown-divider"></div><a onclick="DeleteVoucher(${voucher.voucherId})" class="dropdown-item text-danger" href="#!">Remove</a>
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

function UpdateVoucher(id) {
  localStorage.setItem("Voucher", id);
  window.location.href = "UpdateCategory.html";
}

async function DeleteVoucher(VoucherId) {
  var url = `https://localhost:44339/api/Vouchers/${VoucherId}`;

  let request = await fetch(url, {
    method: "DELETE",
  });
  alert("Voucher has been deleted successfully");
  window.location.reload();
}
GetAllVouchers();
