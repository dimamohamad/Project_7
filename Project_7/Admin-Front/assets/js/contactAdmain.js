async function getAllMessages() {
  const url = "https://localhost:44339/api/Contact/GetMessages";
  const response = await fetch(url);
  const result = await response.json();

  const tableBody = document.getElementById("messagesTableBody");
  tableBody.innerHTML = "";

  result.forEach((card, index) => {
    tableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${card.name}</td>
          <td>${card.email}</td>
          <td>${card.message}</td>
          <td>${new Date(card.submittedAt).toLocaleString()}</td>
          <td>
            <button class="btn btn-danger" onclick="deleteMessage(${
              card.messageId
            })">Delete</button>
          </td>
        </tr>
      `;
  });
}

async function deleteMessage(messageId) {
  const url = `https://localhost:44339/api/Contact/DeleteMessage/${messageId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Message deleted successfully.");

    getAllMessages();
  } else {
    alert("Failed to delete the message.");
  }
}

getAllMessages();
