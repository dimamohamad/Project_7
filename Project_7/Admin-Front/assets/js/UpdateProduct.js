const n = localStorage.getItem("productId");
var url =` https://localhost:44338/Api/Products/UpdateOnproduct/${n}`;
var form = document.getElementById("UpdateProductForm");
async function UpdateProductform() {

    var formData = new FormData(form);
    event.preventDefault();
    let response = await fetch(url, {
        method: 'PUT',
        body: formData,
    });



    var data = response;
     window.location.href = "products.html"
   alert("your product has successfully edited");
}