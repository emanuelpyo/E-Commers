const contactForm = document.getElementById("contact-form");
const formmassage = document.getElementById("form-massage");

contactForm.addEventListener("submit", function (event) {

  event.preventDefault();

  const email = document.getElementById("email").value.trim();

  if (email === "") {
    formmassage.textContent = "Please enter your email.";
    return;
  }

  formmassage.textContent =
    "Thank you. We’ll get back to you soon.";

  contactForm.reset();

});