// ZANELIE POOL PARTY BOOKING SYSTEM

const TICKET_PRICE = 15;
const MAX_TICKETS = 20;

// Organiser WhatsApp numbers
const ORGANISER_WHATSAPP = "263781643997";

const CONTACTS = {
  kudzai: {
    name: "Kudzai N",
    phone: "263781643997"
  },

  shantel: {
    name: "Zanelie (Shanty)",
    phone: "263789524694"
  }
};

// Get form elements
const form = document.getElementById("ticketForm");
const quantity = document.getElementById("ticketQuantity");
const total = document.getElementById("totalAmount");

// Calculate total
function updateTotal() {
  if (!quantity || !total) return;

  const count = Math.min(
    MAX_TICKETS,
    Math.max(1, Number(quantity.value) || 1)
  );

  total.textContent = "$" + (count * TICKET_PRICE).toFixed(2);
}

if (quantity) {
  quantity.addEventListener("input", updateTotal);
}

// Process booking
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name =
      document.getElementById("customerName")?.value.trim();

    const customerPhone =
      document.getElementById("customerPhone")?.value.trim();

    const count = Number(quantity?.value);

    const method =
      document.getElementById("paymentMethod")?.value;

    const recipientId =
      document.getElementById("paymentRecipient")?.value;

    if (!name || !customerPhone) {
      alert("Please enter your full name and phone number.");
      return;
    }

    if (
      !Number.isInteger(count) ||
      count < 1 ||
      count > MAX_TICKETS
    ) {
      alert("Please select between 1 and 20 tickets.");
      return;
    }

    if (method !== "manual") {
      alert(
        "Online card payments are not connected yet. Please choose EcoCash Transfer."
      );
      return;
    }

    const recipient = CONTACTS[recipientId];

    if (!recipient) {
      alert("Please select a payment recipient.");
      return;
    }

    const amount = (count * TICKET_PRICE).toFixed(2);

    const message =
      "HELLO! I WANT TO BOOK ZANELIE POOL PARTY TICKETS 🎟️\n\n" +
      "CUSTOMER DETAILS\n" +
      "Name: " + name + "\n" +
      "WhatsApp: " + customerPhone + "\n\n" +
      "BOOKING DETAILS\n" +
      "Event: Zanelie Pool Party\n" +
      "Date: 21 November\n" +
      "Tickets: " + count + "\n" +
      "Price per ticket: $15\n" +
      "TOTAL: $" + amount + "\n\n" +
      "PAYMENT DETAILS\n" +
      "Payment method: EcoCash\n" +
      "Payment recipient: " + recipient.name + "\n" +
      "EcoCash number: +" + recipient.phone + "\n\n" +
      "Please send me payment instructions.\n" +
      "I will send payment confirmation after paying.\n\n" +
      "BOOKING STATUS: PENDING PAYMENT";

    const whatsappURL =
      "https://wa.me/" +
      recipient.phone +
      "?text=" +
      encodeURIComponent(message);

    window.location.href = whatsappURL;
  });
}

// Initial total
updateTotal();
