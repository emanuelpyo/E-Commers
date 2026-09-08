// ================= SHOP PAGE INTERACTIONS =================

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".product-card"));
    const resultCount = document.getElementById("resultCount");
    const noResults = document.getElementById("noResults");

    const searchInput = document.getElementById("productSearch");
    const categoryInputs = document.querySelectorAll('input[name="category"]');
    const priceInputs = document.querySelectorAll('input[name="price"]');
    const sortSelect = document.getElementById("sortSelect");
    const clearBtn = document.getElementById("clearFilters");

    if (!searchInput || !resultCount || !noResults || !sortSelect || !clearBtn) return;

    // ---------- Collapsible filter groups ----------
    document.querySelectorAll(".filter-title").forEach((title) => {
        title.addEventListener("click", () => {
            title.closest(".filter-group").classList.toggle("collapsed");
        });
    });

    // ---------- Mobile sidebar drawer ----------
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

    // ---------- Wishlist heart toggle ----------
    grid.addEventListener("click", (e) => {
        const heart = e.target.closest(".wishlist-icon");
        if (heart) {
            heart.classList.toggle("active");
        }
    });

    // ---------- Filtering ----------
    function getCheckedValues(nodeList) {
        return Array.from(nodeList)
            .filter((el) => el.checked)
            .map((el) => el.value);
    }

    function applyFilters() {
        const search = searchInput.value.trim().toLowerCase();
        const selectedCategories = getCheckedValues(categoryInputs);
        const priceChecked = Array.from(priceInputs).find((el) => el.checked);
        const [min, max] = priceChecked ? priceChecked.value.split("-").map(Number) : [null, null];

        let visibleCount = 0;

        cards.forEach((card) => {
            const name = card.dataset.name.toLowerCase();
            const category = card.dataset.category;
            const price = Number(card.dataset.price);

            const matchesSearch = !search || name.includes(search);
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(category);
            const matchesPrice = !priceChecked || (price >= min && price <= max);

            const isVisible = matchesSearch && matchesCategory && matchesPrice;
            card.style.display = isVisible ? "" : "none";
            if (isVisible) visibleCount++;
        });

        resultCount.textContent = visibleCount;
        noResults.hidden = visibleCount !== 0;
    }

    searchInput.addEventListener("input", applyFilters);
    categoryInputs.forEach((el) => el.addEventListener("change", applyFilters));
    priceInputs.forEach((el) => el.addEventListener("change", applyFilters));

    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        categoryInputs.forEach((el) => (el.checked = false));
        priceInputs.forEach((el) => (el.checked = false));
        document.querySelector('input[name="productType"][value="all"]')?.click();
        document.querySelector('input[name="availability"][value="all"]')?.click();
        applyFilters();
    });

    // ---------- Sorting ----------
    function applySort() {
        const value = sortSelect.value;
        const sorted = [...cards].sort((a, b) => {
            if (value === "price-asc") return a.dataset.price - b.dataset.price;
            if (value === "price-desc") return b.dataset.price - a.dataset.price;
            if (value === "name-asc") return a.dataset.name.localeCompare(b.dataset.name);
            return 0; // "featured" = original order
        });
        sorted.forEach((card) => grid.appendChild(card));
    }

    sortSelect.addEventListener("change", applySort);

    // Initial count
    applyFilters();
});