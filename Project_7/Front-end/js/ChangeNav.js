document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("Token");
  const userId = localStorage.getItem("userId");

  if (token && userId) {
    document.getElementById("signIn").style.display = "none";
    document.getElementById("signUp").style.display = "none";

    // Create Profile button
    const profileButton = document.createElement("a");
    profileButton.href = "profile.html";
    profileButton.className =
      "hidden items-center justify-center gap-1 text-default-600 hover:text-primary-500 lg:flex";
    profileButton.innerHTML = `
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span class="font-semibold">Profile</span>
      `;

    // Create Log Out button
    const logoutButton = document.createElement("a");
    logoutButton.href = "#";
    logoutButton.className =
      "hidden items-center justify-center gap-1 text-default-600 hover:text-primary-500 lg:flex";
    logoutButton.innerHTML = `
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
        >
          <path d="M16 17l5-5-5-5M21 12H9"></path>
        </svg>
        <span class="font-semibold">Log Out</span>
      `;

    // Log Out function
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("Token");
      localStorage.removeItem("userId");

      window.location.reload();
    });

    const navbar = document.getElementById("batool");
    navbar.appendChild(profileButton);
    navbar.appendChild(logoutButton);
  } else {
    document.getElementById("signIn").style.display = "flex";
    document.getElementById("signUp").style.display = "flex";
  }
});

// function loginUser(username, password) {
//   // إرسال بيانات تسجيل الدخول للـ API
//   fetch("https://localhost:44338/api/Users/LoginUsers", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username: username,
//       password: password,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         // حفظ الـ Token والـ userId في الـ localStorage
//         localStorage.setItem("Token", data.Token);
//         localStorage.setItem("userId", data.userId);

//         // توجيه المستخدم إلى الصفحة الرئيسية أو أي صفحة أخرى
//         window.location.href = "index.html";
//       } else {
//         // التعامل مع خطأ في تسجيل الدخول
//         alert("Login failed. Please check your credentials.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
