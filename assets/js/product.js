document.addEventListener("DOMContentLoaded", () => {
  const productDetail = document.getElementById("productDetail");

  if (!productDetail) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    productDetail.innerHTML = `
      <div class="product-not-found">
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <a href="shop.html">Back to Shop</a>
      </div>
    `;

    return;
  }

  productDetail.innerHTML = `
    <div class="product-gallery">
      <div class="product-thumbnails">
        <button
          type="button"
          class="product-thumbnail active"
          data-image="${product.image}"
          aria-label="View ${product.name}"
        >
          <img src="${product.image}" alt="${product.name}" />
        </button>
      </div>

      <div class="product-main-image">
        <img
          id="mainProductImage"
          src="${product.image}"
          alt="${product.name}"
        />
      </div>
    </div>

    <div class="product-info">
      <span class="product-category">
        ${product.category}
      </span>

      <h1>${product.name}</h1>

      <p class="product-price">
        Rp ${product.price.toLocaleString("id-ID")}
      </p>

      <p class="product-description">
        ${product.description}
      </p>

      <div class="product-purchase">
        <div class="quantity-wrapper">
          <span class="quantity-label">Quantity</span>

          <div class="quantity-selector">
            <button
              type="button"
              id="decreaseQuantity"
              aria-label="Decrease quantity"
            >
              <i class="ri-subtract-line"></i>
            </button>

            <span id="quantity">1</span>

            <button
              type="button"
              id="increaseQuantity"
              aria-label="Increase quantity"
            >
              <i class="ri-add-line"></i>
            </button>
          </div>
        </div>

        <div class="product-actions">
          <button type="button" class="product-buy" id="buyButton">
            Buy
          </button>

          <button type="button" class="product-cart" id="cartButton">
            Add to Bag
          </button>
        </div>

        <button
          type="button"
          class="product-wishlist"
          id="wishlistButton"
          aria-label="Add ${product.name} to wishlist"
        >
          <i class="ri-heart-line"></i>
          <span>Add to Wishlist</span>
        </button>
      </div>

      <div class="product-meta">
        <div class="product-meta-item">
          <button type="button" class="meta-toggle">
            <span>Description</span>
            <i class="ri-add-line"></i>
          </button>

          <div class="product-meta-content">
            ${product.description}
          </div>
        </div>

        <div class="product-meta-item">
          <button type="button" class="meta-toggle">
            <span>Product Information</span>
            <i class="ri-add-line"></i>
          </button>

          <div class="product-meta-content">
            Product category: ${product.category}
          </div>
        </div>
      </div>
    </div>
  `;

  const mainImage = document.getElementById("mainProductImage");
  const thumbnails = document.querySelectorAll(".product-thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const image = thumbnail.dataset.image;

      mainImage.style.opacity = "0";

      setTimeout(() => {
        mainImage.src = image;
        mainImage.style.opacity = "1";
      }, 150);

      thumbnails.forEach((item) => {
        item.classList.remove("active");
      });

      thumbnail.classList.add("active");
    });
  });

  const quantityElement = document.getElementById("quantity");
  const decreaseButton = document.getElementById("decreaseQuantity");
  const increaseButton = document.getElementById("increaseQuantity");

  let quantity = 1;

  decreaseButton.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;
    }
  });

  increaseButton.addEventListener("click", () => {
    quantity++;
    quantityElement.textContent = quantity;
  });

  const wishlistButton = document.getElementById("wishlistButton");

  wishlistButton.addEventListener("click", () => {
    wishlistButton.classList.toggle("active");

    const icon = wishlistButton.querySelector("i");
    const text = wishlistButton.querySelector("span");

    const isActive = wishlistButton.classList.contains("active");

    icon.className = isActive ? "ri-heart-fill" : "ri-heart-line";

    text.textContent = isActive ? "Added to Wishlist" : "Add to Wishlist";
  });

  const buyButton = document.getElementById("buyButton");
  const cartButton = document.getElementById("cartButton");

  buyButton.addEventListener("click", () => {
    console.log("Buy product:", product.name, "Quantity:", quantity);
  });

  cartButton.addEventListener("click", () => {
    console.log("Add to bag:", product.name, "Quantity:", quantity);
  });

  document.querySelectorAll(".meta-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".product-meta-item").classList.toggle("open");
    });
  });
});
