
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

const toggleSidebar = () => {
  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("collapsed");
};


if (menuBtn) menuBtn.addEventListener("click", toggleSidebar);

const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

const products = [
  {
    id: 1,
    name: "Kinder Joy (Boys)",
    price: 109,
    image: "../images/joy.png",
    code: "915",
  },
  {
    id: 2,
    name: "Ferrero Rocher Premium Chocolates",
    price: 1100,
    image: "../images/ferrero.png",
    code: "85",
  },
  {
    id: 3,
    name: "Dan Cake Classic Brownies",
    price: 140,
    image: "../images/cake.png",
    code: "76",
  },
  {
    id: 4,
    name: "Chicken Keema",
    price: 699,
    image: "../images/meat.png",
    code: "88",
  },
  {
    id: 5,
    name: "Chicken Eggs",
    price: 105,
    image: "../images/eggs.png",
    code: "74",
  },
  {
    id: 6,
    name: "Dairy Milk Silk",
    price: 190,
    image: "../images/silk.png",
    code: "81",
  },
  {
    id: 7,
    name: "Chicken Drumsticks",
    price: 269,
    image: "../images/drumsticks.png",
    code: "193",
  },
  {
    id: 8,
    name: "Bounty Chocolate",
    price: 105,
    image: "../images/bounty.png",
    code: "79",
  },
  {
    id: 9,
    name: "Purnava Omega 3 Enriched Eggs (89)",
    price: "280",
    image: "../images/mega.png",
    code: "89",
  },
  {
    id: 10,
    name: "Pran Potato Cracker (87)",
    price: " 9.9",
    image: "../images/potato87.png",
    code: "87",
  },
  {
    id: 11,
    name: "Oreo Original Cream Biscuit (89)",
    price: "150",
    image: "../images/oreocream.png",
    code: "89",
  },
  {
    id: 12,
    name: "Nestle Maggi 2-Minute Masala Instant Noodles (93)",
    price: " 174",
    image: "../images/magginoodles.png",
    code: "93",
  },
];

let cart = [];

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = products
    .map(
      (product) => `
        <div class="product-item" onclick="addToCart(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-name">${product.name} (${product.code})</div>
            <div class="product-price">Price: ${product.price}</div>
        </div>
    `
    )
    .join("");
}
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  renderCart();
  updateTotals();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
  updateTotals();
}

function updateQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    renderCart();
    updateTotals();
  }
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");

  cartItems.innerHTML =
    cart
      .map(
        (item) => `
        <tr>
          <td>${item.name}</td>
          <td>
            <div class="quantity-controls">
              <button class="qty-btn" onclick="updateQuantity(${item.id}, ${
          item.quantity - 1
        })">-</button>
              <input type="number" class="qty-input" value="${
                item.quantity
              }" onchange="updateQuantity(${item.id}, parseInt(this.value))">
              <button class="qty-btn" onclick="updateQuantity(${item.id}, ${
          item.quantity + 1
        })">+</button>
            </div>
          </td>
          <td>RS ${item.price}</td>
          <td>RS ${item.price * item.quantity}</td>
          <td><button class="remove-btn" onclick="removeFromCart(${
            item.id
          })">×</button></td>
        </tr>
      `
      )
      .join("") +
    `
      <tr>
        <td colspan="5" style="text-align: right; padding-top: 15px;">
          <button onclick="confirmClearCart()" class="clear-cart-btn">🗑️ Clear Cart</button>
          <button onclick="checkoutCart()" class="checkout-btn">✅ Checkout</button>
        </td>
      </tr>
    `;
}

function confirmClearCart() {
  const confirmBox = document.createElement("div");
  confirmBox.className = "confirm-box";
  confirmBox.innerHTML = `
    <div class="confirm-message">
      <p>Are you sure you want to clear the cart?</p>
      <button onclick="clearCart()">Yes</button>
      <button onclick="this.parentElement.parentElement.remove()">No</button>
    </div>
  `;
  document.body.appendChild(confirmBox);
}
function clearCart() {
  cart = [];
  renderCart();
  updateTotals();
  beepSound.play();
  document.querySelector(".confirm-box")?.remove();
}
function checkoutCart() {
  alert("Checkout functionality coming soon!");
}

function updateTotals() {
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount =
    parseFloat(document.getElementById("discountInput").value) || 0;
  const finalTotal = subTotal - discount;

  document.getElementById("subTotal").textContent = `RS ${subTotal}`;
  document.getElementById("finalTotal").textContent = `RS ${finalTotal}`;
}

function toggleSubmenu(submenuId, element) {
  const submenu = document.getElementById(submenuId);
  const chevron = element.querySelector(".nav-chevron");

  if (submenu.style.display === "block") {
    submenu.style.display = "none";
    chevron.style.transform = "rotate(0deg)";
  } else {
    submenu.style.display = "block";
    chevron.style.transform = "rotate(-90deg)";
  }
}

function navigateTo(page) {
  if (page === "dashboard") {
    alert("Navigate to Dashboard");
  }
}
document.getElementById("userMenuBtn").addEventListener("click", function () {
  const dropdown = document.getElementById("userDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("userDropdown");
  const userMenuBtn = document.getElementById("userMenuBtn");

  if (!userMenuBtn.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

document
  .getElementById("discountInput")
  .addEventListener("input", updateTotals);

renderProducts();
renderCart();
updateTotals();

const beepSound = new Audio("../sounds/beep-07a.mp3");

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
    });
  }

  renderCart();
  updateTotals();
  beepSound.play();
}

function removeFromCart(productId) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  if (confirm(`Are you sure you want to delete "${item.name}" from cart?`)) {
    cart = cart.filter((item) => item.id !== productId);
    renderCart();
    updateTotals();
    beepSound.play();
  }
}

function updateQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    renderCart();
    updateTotals();
    beepSound.play();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const deleteBtn = document.querySelector(".customer-section .barcode-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      if (confirm('Are you sure you want to delete "Walking Customer"?')) {
        document.querySelector(".customer-input").value = "";
        beepSound.play();
      }
    });
  }
});
