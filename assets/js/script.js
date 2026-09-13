const header = document.querySelector("header");
const menu = document.querySelector("#menu");
const navLinks = document.querySelector(".nav-links");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 20);
    });
}

if (menu && navLinks) {
    menu.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}