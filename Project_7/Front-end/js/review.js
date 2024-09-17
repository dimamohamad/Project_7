async function addReview(event) {
  event.preventDefault();
  const reviewData = {
    Rating: document.getElementById("reviewRating").value,
    Comment: document.getElementById("review").value,
    ProductId: localStorage.getItem("productId"), // تأكد من جلب الـ productId بشكل ديناميكي
  };

  try {
    const response = await fetch(
      "https://localhost:44338/api/Reviews/AddReview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      }
    );

    if (response.ok) {
      const newReview = await response.json();
      addNewReviewToPage(newReview); // إضافة التعليق الجديد إلى الصفحة
      document.getElementById("reviewForm").reset(); // إعادة تعيين النموذج
    } else {
      alert("Error posting review");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while posting the review.");
  }
}
