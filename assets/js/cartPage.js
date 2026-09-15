const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

function renderCart() {
  const cart = getCart();

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h2>Your bag is empty</h2>
        <p>Looks like you haven't added anything to your bag yet.</p>
        <a href="shop.html">Continue Shopping</a>
      </div>
    `;

    cartSubtotal.textContent = formatPrice(0);
    cartTotal.textContent = formatPrice(0);

    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>

      <div class="cart-item-info">
        <div>
          <div class="cart-item-category">
            ${item.category || "Product"}
          </div>

          <h3>${item.name}</h3>

          <p class="cart-item-price">
            ${formatPrice(item.price)}
          </p>
        </div>

        <div class="cart-item-quantity">
          <button type="button" class="decrease-quantity" data-id="${item.id}">
            −
          </button>

          <span>${item.quantity}</span>

          <button type="button" class="increase-quantity" data-id="${item.id}">
            +
          </button>
        </div>
      </div>

      <div class="cart-item-actions">
        <span class="cart-item-subtotal">
          ${formatPrice(item.price * item.quantity)}
        </span>

        <button
          type="button"
          class="remove-item"
          data-id="${item.id}"
        >
          Remove
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  updateCartTotal(cart);
}

function updateCartTotal(cart) {
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  cartSubtotal.textContent = formatPrice(subtotal);
  cartTotal.textContent = formatPrice(subtotal);
}

function updateQuantity(productId, change) {
  const cart = getCart();

  const item = cart.find((product) => product.id === productId);

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    const updatedCart = cart.filter((product) => product.id !== productId);

    saveCart(updatedCart);
  } else {
    saveCart(cart);
  }

  renderCart();
}

function removeItem(productId) {
  const cart = getCart();

  const updatedCart = cart.filter((item) => item.id !== productId);

  saveCart(updatedCart);

  renderCart();
}

cartItemsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const productId = Number(button.dataset.id);

  if (button.classList.contains("increase-quantity")) {
    updateQuantity(productId, 1);
  }

  if (button.classList.contains("decrease-quantity")) {
    updateQuantity(productId, -1);
  }

  if (button.classList.contains("remove-item")) {
    removeItem(productId);
  }
});

renderCart();
