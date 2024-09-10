// const url = "https://localhost:44339/api/Vouchers";
// debugger;

// var form = document.getElementById("addForm");
// async function addCategory() {
//   debugger;
//   event.preventDefault();
//   var formData = new FormData(form);
//   let response = await fetch(url, {
//     method: "POST",
//     body: formData,
//   });
//   var data = response;

//   alert("your category have been added successfully");
//   window.location.href = "showCategory.html";
// }



async function AddVoucher(event) {
    debugger;
    console.log("Try to create a new voucher");
    
    event.preventDefault();
    const url2 = "https://localhost:44339/api/Vouchers";
    let voucherCode = document.getElementById("voucherCode").value;
    let discountPercentage = document.getElementById("discountPercentage").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let isActive = document.getElementById("isActive").value;
    var data = {
      voucherCode: voucherCode,
      discountPercentage: discountPercentage,
      startDate: startDate,
      endDate:endDate,
      isActive:isActive,
    };
    var response = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    alert("the Voucher added successfully");
  }