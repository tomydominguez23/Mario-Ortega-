const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDotsContainer = document.getElementById("heroDots");
const heroPrevBtn = document.querySelector(".hero-carousel .prev");
const heroNextBtn = document.querySelector(".hero-carousel .next");

let heroIndex = 0;
let heroTimerId;

function renderHeroDots() {
  heroSlides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir a imagen ${idx + 1}`);
    dot.dataset.index = String(idx);
    if (idx === 0) dot.classList.add("active");
    heroDotsContainer.appendChild(dot);
  });
}

function setHeroSlide(newIndex) {
  heroSlides[heroIndex].classList.remove("is-active");
  heroIndex = (newIndex + heroSlides.length) % heroSlides.length;
  heroSlides[heroIndex].classList.add("is-active");

  const dots = heroDotsContainer.querySelectorAll("button");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === heroIndex);
  });
}

function nextHeroSlide() {
  setHeroSlide(heroIndex + 1);
}

function startHeroAutoplay() {
  heroTimerId = window.setInterval(nextHeroSlide, 5000);
}

function resetHeroAutoplay() {
  window.clearInterval(heroTimerId);
  startHeroAutoplay();
}

renderHeroDots();
startHeroAutoplay();

heroPrevBtn.addEventListener("click", () => {
  setHeroSlide(heroIndex - 1);
  resetHeroAutoplay();
});

heroNextBtn.addEventListener("click", () => {
  nextHeroSlide();
  resetHeroAutoplay();
});

heroDotsContainer.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.dataset.index) return;
  setHeroSlide(Number(target.dataset.index));
  resetHeroAutoplay();
});

const booksTrack = document.getElementById("booksTrack");
const booksCards = Array.from(document.querySelectorAll(".book-card"));
const booksPrevBtn = document.getElementById("booksPrev");
const booksNextBtn = document.getElementById("booksNext");

let booksIndex = 0;

function getBooksVisible() {
  if (window.innerWidth <= 700) return 1;
  if (window.innerWidth <= 1000) return 2;
  return 3;
}

function updateBooksCarousel() {
  const booksVisible = getBooksVisible();
  const cardWidth = booksCards[0].getBoundingClientRect().width;
  const gap = 16;
  const maxIndex = Math.max(booksCards.length - booksVisible, 0);

  booksIndex = Math.min(booksIndex, maxIndex);
  booksTrack.style.transform = `translateX(-${booksIndex * (cardWidth + gap)}px)`;

  booksPrevBtn.disabled = booksIndex === 0;
  booksNextBtn.disabled = booksIndex >= maxIndex;
  booksPrevBtn.style.opacity = booksPrevBtn.disabled ? "0.45" : "1";
  booksNextBtn.style.opacity = booksNextBtn.disabled ? "0.45" : "1";
}

booksPrevBtn.addEventListener("click", () => {
  booksIndex -= 1;
  updateBooksCarousel();
});

booksNextBtn.addEventListener("click", () => {
  booksIndex += 1;
  updateBooksCarousel();
});

window.addEventListener("resize", updateBooksCarousel);
window.addEventListener("load", updateBooksCarousel);
