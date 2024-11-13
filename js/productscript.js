
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Product List
var products = [
  { id: 1, name: "ARABIC SAMOSA", price: 1250, image: "./img/PRODCUT/ARABIC SAMOSA.png" },
  { id: 2, name: "CHICKEN NUGGETS", price: 660, image: "./img/PRODCUT/NUGGET.png" },
  { id: 3, name: "CHICKEN CHIMMI CHANGA", price: 960, image: "./img/PRODCUT/BREAD CHICKEN CHIMMI CHANGA.png" },
  { id: 4, name: "CHEESE LOLLIPOP", price: 860, image: "./img/PRODCUT/CHEESE LOLIIPOP.png" },
  { id: 5, name: "CHICKEN CHILLOS", price: 700, image: "./img/PRODCUT/CHICKEN CHILLOS.png" },
  { id: 6, name: "CHICKEN SAMOSA", price: 560, image: "./img/PRODCUT/CHICKEN SAMOSA.png" },
  { id: 7, name: "CHICKEN SHAHI ROLL", price: 720, image: "./img/PRODCUT/CHICKEN SHAHI ROLL.png" },
  { id: 8, name: "ONEBITE ROLL", price: 620, image: "./img/PRODCUT/ONEBITE ROLL.png" },
  { id: 9, name: "ONEBITE SAMOSA", price: 640, image: "./img/PRODCUT/ONEBITE SAMOSA.png" },
];

// Render Product List
function renderProductList() {
  var productListContainer = document.getElementById("product-list");
  productListContainer.innerHTML = "";

  products.forEach((product) => {
    var productCard = `
      <div class="col-md-4 mb-5">
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name} <br> (12 Pcs Per Pack)</h5>
            <p class="card-text">Price: PKR ${product.price}</p>
            <div class="cart-controls" id="cart-controls-${product.id}">
              ${renderCartControls(product.id)}
            </div>
          </div>
        </div>
      </div>
    `;
    productListContainer.insertAdjacentHTML("beforeend", productCard);
  });
}

// Render Cart Controls for a Product
function renderCartControls(productId) {
  var existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    return `
      <button class="btn btn-sm btn-dark" onclick="updateQuantity(${productId}, -1)">-</button>
      <span>${existingProduct.quantity}</span>
      <button class="btn btn-sm btn-dark" onclick="updateQuantity(${productId}, 1)">+</button>
    `;
  } else {
    var product = products.find((item) => item.id === productId);
    return `
      <button class="btn btn-danger add-to-cart" onclick="addToCart(${productId}, '${product.name}', ${product.price})">
        Add to Cart
      </button>
    `;
  }
}

// Add Product to Cart
function addToCart(productId, name, price) {
  var existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id: productId, name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderProductList();
  updateFloatingCartButton();
  updateCheckoutLink();
}

// Update Quantity
function updateQuantity(productId, change) {
  var product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProductList();
    updateFloatingCartButton();
  }
}

// Update Floating Cart Button
function updateFloatingCartButton() {
  var floatingCartButton = document.getElementById("floatingCartButton");
  var totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  var totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (totalItems > 0) {
    floatingCartButton.style.display = "block";
    floatingCartButton.innerText = `Cart: ${totalItems} Items | PKR ${totalAmount.toFixed(2)}`;
  } else {
    floatingCartButton.style.display = "none";
  }
}

function updateCheckoutLink() {
  var checkoutLink = document.getElementById("checkoutLink");
  var cartCount = document.getElementById("cartCount");

  var totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems > 0) {
    checkoutLink.classList.add("cart-highlight");
    cartCount.style.display = "inline-block";
    cartCount.textContent = totalItems;
  } else {
    checkoutLink.classList.remove("cart-highlight");
    cartCount.style.display = "none";
  }
}


// Floating Cart Button Click Event
document.getElementById("floatingCartButton").addEventListener("click", () => {
  window.location.href = "./checkout.html";
});


// Initialize Page
renderProductList();
updateFloatingCartButton();
updateCheckoutLink();