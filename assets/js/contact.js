/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (email === "") {
    formMessage.textContent = "Please enter your email.";
    return;
  }

  formMessage.textContent =
    "Thank you. We’ll get back to you soon.";

  contactForm.reset();

});