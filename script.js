
// =====================================
// ZANELIE POOL PARTY - WEBSITE SETTINGS
// =====================================

// Replace with the organiser's WhatsApp number.
// Zimbabwe example: 263771234567
const WHATSAPP_NUMBER = "263771234567";

// Add your real Paynow hosted checkout URL here
// Leave empty until payment integration is configured.
const PAYNOW_CHECKOUT_URL = "";

// Ticket price
const TICKET_PRICE = 15;

// =====================================
// TICKET CALCULATIONS
// =====================================

const quantity = document.getElementById("ticketQuantity");
const total = document.getElementById("totalAmount");

function updateTotal() {
  let count = Number(quantity.value);

  if (!Number.isInteger(count) || count < 1) {
    count = 1;
  }

  if (count > 20) {
    count = 20;
  }

  total.textContent = "$" + (count * TICKET_PRICE).toFixed(2);
}

quantity.addEventListener("input", updateTotal);

// =====================================
// CHECKOUT
// =====================================

document.getElementById("ticketForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const count = Number(quantity.value);
  const method = document.getElementById("paymentMethod").value;

  if (!name || !phone) {
    alert("Please complete all your details.");
    return;
  }

  if (!Number.isInteger(count) || count < 1 || count > 20) {
    alert("Please choose between 1 and 20 tickets.");
    return;
  }

  const amount = (count * TICKET_PRICE).toFixed(2);

  const message =
    "ZANELIE POOL PARTY - TICKET REQUEST\n\n" +
    "Name: " + name + "\n" +
    "Phone: " + phone + "\n" +
    "Tickets: " + count + "\n" +
    "Total: $" + amount + "\n" +
    "Payment: " + method + "\n\n" +
    "Please assist me with my ticket purchase.";

  if (method === "manual") {
    if (WHATSAPP_NUMBER === "263771234567") {
      alert("Please configure the organiser's WhatsApp number in script.js first.");
      return;
    }

    const url = "https://wa.me/" + WHATSAPP_NUMBER +
      "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
    return;
  }

  if (method === "online") {
    if (!PAYNOW_CHECKOUT_URL) {
      alert("Online checkout is not configured yet. Please contact the organiser or choose Manual Payment.");
      return;
    }

    // Configure a secure server-side Paynow checkout
    // before connecting this hosted checkout URL.
    window.location.href = PAYNOW_CHECKOUT_URL;
  }
});
