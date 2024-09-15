async function getAllMessages() {
  const url = "https://localhost:44339/api/Contact/GetMessages";
  const response = await fetch(url);
  const result = await response.json();

  const tableBody = document.getElementById("showMessageContact");
  tableBody.innerHTML = "";

  result.forEach((message) => {
    const shortenedMessage =
      message.message.length > 10
        ? message.message.substring(0, 10) + "..."
        : message.message;

    tableBody.innerHTML += ` 
      <tr class="position-static">
        <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">${message.name}</td>
        <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">${message.email}</td>
        <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">
          ${shortenedMessage} 
          <button class="btn btn-link" onclick="showFullMessage('${message.message}')">Show more</button>
        </td>
        <td class="tags align-middle review pb-2 ps-3" style="min-width:225px;">${message.submittedAt}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteMessage(${message.messageId})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function showFullMessage(fullMessage) {
  document.getElementById("popupMessage").textContent = fullMessage;
  document.getElementById("messagePopup").style.display = "block";
}

function closePopup() {
  document.getElementById("messagePopup").style.display = "none";
}

// حذف الرسالة
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
