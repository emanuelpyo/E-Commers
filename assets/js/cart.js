function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
