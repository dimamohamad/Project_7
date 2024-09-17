


async function UpdateVoucher(event) {
    const n = localStorage.getItem("Voucher");
    var url = `https://localhost:44338/api/Vouchers/${n}`;
    let voucherCode = document.getElementById("voucherCode").value;
    let discountPercentage = document.getElementById("discountPercentage").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let isActive = document.getElementById("isActive").value;
    var data = {
      voucherCode: voucherCode,
      discountPercentage: discountPercentage,
      startDate: startDate,
      endDate: endDate,
      isActive: isActive,
    };
    
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("Voucher Updated successfully ");
    window.location.href("showVoucher.html");
  }
  
