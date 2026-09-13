document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");

  const searchInput = document.getElementById("productSearch");
  const categoryInputs = document.querySelectorAll('input[name="category"]');
  const priceInputs = document.querySelectorAll('input[name="price"]');
  const sortSelect = document.getElementById("sortSelect");
  const clearBtn = document.getElementById("clearFilters");

  if (!searchInput || !resultCount || !noResults || !sortSelect || !clearBtn) {
    return;
  }

  const sidebar = document.getElementById("shopSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  const openSidebarBtn = document.getElementById("filterTrigger");
  const closeSidebarBtn = document.getElementById("closeSidebar");

  function renderProducts(productList) {
    grid.innerHTML = "";

    productList.forEach((product) => {
      const card = document.createElement("div");

      card.className = "product-card";
      card.dataset.id = product.id;

      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-action">
            <i class="ri-heart-line wishlist-icon"></i>
            <i class="ri-shopping-bag-line"></i>
            <i class="ri-eye-line"></i>
          </div>
        </div>

        <div class="product-info">
          <h4>${product.name}</h4>
          <p>Rp ${product.price.toLocaleString("id-ID")}</p>
          <a href="#" class="btn-buy">Buy</a>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  function getCheckedValues(nodeList) {
    return Array.from(nodeList)
      .filter((input) => input.checked)
      .map((input) => input.value);
  }

  function getFilteredProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const selectedCategories = getCheckedValues(categoryInputs);
    const priceChecked = Array.from(priceInputs).find((input) => input.checked);

    const [min, max] = priceChecked
      ? priceChecked.value.split("-").map(Number)
      : [null, null];

    return products.filter((product) => {
      const matchesSearch =
        !search || product.name.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice =
        !priceChecked || (product.price >= min && product.price <= max);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }

  function getSortedProducts(productList) {
    const value = sortSelect.value;
    const sortedProducts = [...productList];

    if (value === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (value === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (value === "name-asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return sortedProducts;
  }

  function updateProducts() {
    const filteredProducts = getFilteredProducts();
    const sortedProducts = getSortedProducts(filteredProducts);

    renderProducts(sortedProducts);

    resultCount.textContent = sortedProducts.length;
    noResults.hidden = sortedProducts.length !== 0;
  }

  document.querySelectorAll(".filter-title").forEach((title) => {
    title.addEventListener("click", () => {
      title.closest(".filter-group").classList.toggle("collapsed");
    });
  });

  function openSidebar() {
    sidebar?.classList.add("open");
    backdrop?.classList.add("open");
  }

  function closeSidebar() {
    sidebar?.classList.remove("open");
    backdrop?.classList.remove("open");
  }

  openSidebarBtn?.addEventListener("click", openSidebar);
  closeSidebarBtn?.addEventListener("click", closeSidebar);
  backdrop?.addEventListener("click", closeSidebar);

  grid.addEventListener("click", (event) => {
    const heart = event.target.closest(".wishlist-icon");

    if (heart) {
      heart.classList.toggle("active");
    }
  });

  searchInput.addEventListener("input", updateProducts);

  categoryInputs.forEach((input) => {
    input.addEventListener("change", updateProducts);
  });

  priceInputs.forEach((input) => {
    input.addEventListener("change", updateProducts);
  });

  sortSelect.addEventListener("change", updateProducts);

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";

    categoryInputs.forEach((input) => {
      input.checked = false;
    });

    priceInputs.forEach((input) => {
      input.checked = false;
    });

    sortSelect.value = "featured";

    updateProducts();
  });

  updateProducts();
});
