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

  function renderProducts() {
    grid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");

      card.className = "product-card";
      card.dataset.category = product.category;
      card.dataset.price = product.price;
      card.dataset.name = product.name;

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

  renderProducts();

  const cards = Array.from(grid.querySelectorAll(".product-card"));

  document.querySelectorAll(".filter-title").forEach((title) => {
    title.addEventListener("click", () => {
      title.closest(".filter-group").classList.toggle("collapsed");
    });
  });

  const sidebar = document.getElementById("shopSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  const openSidebarBtn = document.getElementById("filterTrigger");
  const closeSidebarBtn = document.getElementById("closeSidebar");

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

  function getCheckedValues(nodeList) {
    return Array.from(nodeList)
      .filter((input) => input.checked)
      .map((input) => input.value);
  }

  function applyFilters() {
    const search = searchInput.value.trim().toLowerCase();
    const selectedCategories = getCheckedValues(categoryInputs);
    const priceChecked = Array.from(priceInputs).find((input) => input.checked);

    const [min, max] = priceChecked
      ? priceChecked.value.split("-").map(Number)
      : [null, null];

    let visibleCount = 0;

    cards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category;
      const price = Number(card.dataset.price);

      const matchesSearch = !search || name.includes(search);
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(category);
      const matchesPrice = !priceChecked || (price >= min && price <= max);

      const isVisible = matchesSearch && matchesCategory && matchesPrice;

      card.style.display = isVisible ? "" : "none";

      if (isVisible) {
        visibleCount++;
      }
    });

    resultCount.textContent = visibleCount;
    noResults.hidden = visibleCount !== 0;
  }

  function applySort() {
    const value = sortSelect.value;

    const sorted = [...cards].sort((a, b) => {
      if (value === "price-asc") {
        return Number(a.dataset.price) - Number(b.dataset.price);
      }

      if (value === "price-desc") {
        return Number(b.dataset.price) - Number(a.dataset.price);
      }

      if (value === "name-asc") {
        return a.dataset.name.localeCompare(b.dataset.name);
      }

      return 0;
    });

    sorted.forEach((card) => {
      grid.appendChild(card);
    });
  }

  searchInput.addEventListener("input", applyFilters);

  categoryInputs.forEach((input) => {
    input.addEventListener("change", applyFilters);
  });

  priceInputs.forEach((input) => {
    input.addEventListener("change", applyFilters);
  });

  sortSelect.addEventListener("change", applySort);

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";

    categoryInputs.forEach((input) => {
      input.checked = false;
    });

    priceInputs.forEach((input) => {
      input.checked = false;
    });

    sortSelect.value = "featured";

    applySort();
    applyFilters();
  });

  applyFilters();
});
