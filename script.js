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

if (heroSlides.length && heroDotsContainer && heroPrevBtn && heroNextBtn) {
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
}
