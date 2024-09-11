document
  .getElementById("email-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("your-email").value;

    try {
      const response = await fetch("https://localhost:44338/api/Users/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ToEmail: email }),
      });
      const data = await response.json();

      if (data.otp) {
        alert("OTP sent to your email.");
        document.getElementById("email-form").style.display = "none";
        document.getElementById("otp-container").style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

document
  .getElementById("otp-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("your-email").value;
    const otp = document.getElementById("otp-input").value;

    try {
      const response = await fetch(
        `https://localhost:44338/api/Users/GetUserByEmail/${email}`
      );
      const user = await response.json();

      if (user && user.Passwword === otp) {
        document.getElementById("otp-container").style.display = "none";
        document.getElementById("password-container").style.display = "block";
      } else {
        alert("Invalid OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

document
  .getElementById("password-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const repeatPassword = document.getElementById("repeat-password").value;
    const email = document.getElementById("your-email").value;

    if (newPassword !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userResponse = await fetch(
        `https://localhost:44338/api/Users/GetUserByEmail/${email}`
      );
      const user = await userResponse.json();

      if (user) {
        const response = await fetch(
          `https://localhost:44338/api/Users/ChangePassword/${user.UserId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Password: newPassword }),
          }
        );
        const data = await response.json();

        if (data) {
          alert("Password changed successfully.");
        }
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
