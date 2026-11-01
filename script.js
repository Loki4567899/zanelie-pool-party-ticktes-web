
const TICKET_PRICE = 15;

const CONTACTS = {
  kudzai: {
    name: "Kudzai N",
    phone: "263781643997"
  },
  shantel: {
    name: "Shantel R",
    phone: "263789524694"
  }
};

// Update total
const quantity = document.getElementById("ticketQuantity");
const total = document.getElementById("totalAmount");

function updateTotal() {
  let count = Math.min(20, Math.max(1, Number(quantity.value) || 1));
  total.textContent = "$" + (count * TICKET_PRICE).toFixed(2);
}

quantity.addEventListener("input", updateTotal);

// Booking system
document.getElementById("ticketForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const count = Number(quantity.value);
  const method = document.getElementById("paymentMethod").value;
  const recipientId = document.getElementById("paymentRecipient").value;

  if (!name || !phone || !Number.isInteger(count) || count < 1 || count > 20) {
    alert("Please check your details and ticket quantity.");
    return;
  }

  const recipient = CONTACTS[recipientId];

  if (!recipient) {
    alert("Please select a payment recipient.");
    return;
  }

  const amount = (count * TICKET_PRICE).toFixed(2);

  if (method === "online") {
    alert(
      "Online card checkout is not connected yet. " +
      "Please select EcoCash Transfer for now."
    );
    return;
  }

  const message =
    "HELLO! I WANT TO BOOK ZANELIE POOL PARTY TICKETS.\n\n" +
    "CUSTOMER DETAILS\n" +
    "Name: " + name + "\n" +
    "WhatsApp: " + phone + "\n\n" +
    "BOOKING DETAILS\n" +
    "Tickets: " + count + "\n" +
    "Price per ticket: $15\n" +
    "TOTAL: $" + amount + "\n\n" +
    "PAYMENT DETAILS\n" +
    "Recipient: " + recipient.name + "\n" +
    "EcoCash Number: + " + recipient.phone + "\n\n" +
    "Please send me the payment instructions. " +
    "I will send my payment confirmation here.\n\n" +
    "STATUS: PENDING PAYMENT";

  const whatsappURL =
    "https://wa.me/" + recipient.phone +
    "?text=" + encodeURIComponent(message);

  window.location.href = whatsappURL;
});

updateTotal();
