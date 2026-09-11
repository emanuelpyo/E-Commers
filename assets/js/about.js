const aboutImages = [
  "../images/about1.png",
  "../images/about2.png",
  "../images/about3.png"
];


const aboutImage = document.getElementById("about-image");

const prevButton = document.getElementById("prev-button");

const nextButton = document.getElementById("next-button");

const sliderIndicator = document.getElementById("slider-indicator");


let currentImage = 0;

function showImage(index) {

  aboutImage.style.opacity = "0";

  setTimeout(() => {

    aboutImage.src = aboutImages[index];

    aboutImage.style.opacity = "1";

  }, 150);

  const currentNumber = String(index + 1).padStart(2, "0");

  const totalNumber = String(aboutImages.length).padStart(2, "0");

  sliderIndicator.textContent = `${currentNumber} / ${totalNumber}`;
}

function nextImage() {

  currentImage++;

  if (currentImage >= aboutImages.length) {
    currentImage = 0;
  }

  showImage(currentImage);
}

function previousImage() {

  currentImage--;

  if (currentImage < 0) {
    currentImage = aboutImages.length - 1;
  }

  showImage(currentImage);
}

nextButton.addEventListener("click", nextImage);

prevButton.addEventListener("click", previousImage);

document.addEventListener("keydown", (event) => {

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "ArrowLeft") {
    previousImage();
  }

});