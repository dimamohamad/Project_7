// Function to handle form submission and OTP request
document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;

  try {
    const response = await fetch("https://localhost:44339/api/Users/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ ToEmail: email }),
    });

    if (response.ok) {
      // Display the OTP popup
      document.getElementById("otpPopup").style.display = "block";
    } else {
      const errorText = await response.text();
      alert("Error sending OTP: " + errorText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Function to verify OTP and display password change form
async function verifyOtp() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;

  // Fetch the user by email to get user ID
  const userResponse = await fetch(
    `https://localhost:44339/api/Users/GetUserByEmail/${encodeURIComponent(
      email
    )}`
  );

  if (userResponse.ok) {
    const user = await userResponse.json();
    const userId = user.userId;
    const otp = user.passwword;

    console.log(otp);
    document.getElementById("passwordForm").style.display = "block";
  }
}

// Function to change password
async function changePassword() {
  const email = document.getElementById("email").value;
  const newPassword = document.getElementById("newPassword").value;
  const repeatPassword = document.getElementById("repeatPassword").value;

  if (newPassword !== repeatPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userResponse = await fetch(
      `https://localhost:44339/api/Users/GetUserByEmail/${encodeURIComponent(
        email
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (userResponse.ok) {
      const user = await userResponse.json();
      const userId = user.userId;

      const passwordResponse = await fetch(
        `https://localhost:44339/api/Users/ChangePassword/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Passwword: newPassword }),
        }
      );

      if (passwordResponse.ok) {
        alert("Password changed successfully.");
      } else {
        alert("Error changing password.");
      }
    } else {
      alert("User not found.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
