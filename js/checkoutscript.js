

let cart = JSON.parse(localStorage.getItem("cart")) || [];
function renderCartItems() {
  var cartItems = document.getElementById("cart-items");
  var cartTotal = document.getElementById("cart-total");
  var checkoutActions = document.getElementById("checkout-actions");

  // If cart is empty
  if (cart.length === 0) {
    cartItems.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    cartTotal.textContent = "0.00";
    checkoutActions.style.display = "none"; // Hide action buttons
    return;
  }

  // If cart has items
  checkoutActions.style.display = "flex"; // Show action buttons
  cartItems.innerHTML = ""; // Clear current list
  let total = 0;

  // Render each cart item
  cart.forEach((item, index) => {
    var itemTotal = item.price * item.quantity;
    total += itemTotal;

    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.name} (x${item.quantity}) 
      <span>PKR ${itemTotal.toFixed(2)}</span>
      <div class="d-flex justify-content-between">
        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(index, change) {
  cart[index].quantity += change;

  // Remove item if quantity <= 0
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  // Update local storage and re-render
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}

// Clear Cart Button
document.getElementById("clear-cart").addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "This will remove all items from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, clear it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      cart = [];
      localStorage.removeItem("cart");
      renderCartItems();
    }
  });
});

// Proceed to Payment Button
document.getElementById("proceed-to-payment").addEventListener("click", () => {
  if (cart.length === 0) return;

  let orderSummary = "Hello! I'd like to place an order:\n\n";
  let total = 0;

  cart.forEach((item) => {
    orderSummary += `- ${item.name} (x${item.quantity}): PKR ${(item.price * item.quantity).toFixed(2)}\n`;
    total += item.price * item.quantity;
  });

  orderSummary += `\nTotal: PKR ${total.toFixed(2)}`;

  var phoneNumber = "923136798010"; // Replace with your WhatsApp number
  var whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderSummary)}`;

  Swal.fire({
    icon: "success",
    title: "Order Ready",
    text: "You will now be redirected to WhatsApp to complete your order.",
    confirmButtonText: "OK",
  }).then(() => {
    cart = [];
    localStorage.removeItem("cart");
    window.location.href = whatsappURL;
  });
});

// Initial Render
renderCartItems();
