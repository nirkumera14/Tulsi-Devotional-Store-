const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetId = tab.dataset.tab;
    tabs.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });

    panels.forEach((panel) => {
      panel.classList.remove("active");
      panel.hidden = true;
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add("active");
      targetPanel.hidden = false;
    }
  });
});

const reviews = Array.from(document.querySelectorAll(".review"));
const dots = Array.from(document.querySelectorAll(".dot"));
let reviewIndex = 0;

function showReview(index) {
  reviews.forEach((review, i) => {
    review.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    reviewIndex = Number(dot.dataset.review) || 0;
    showReview(reviewIndex);
  });
});

if (reviews.length > 1) {
  setInterval(() => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    showReview(reviewIndex);
  }, 4500);
}

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minEl = document.getElementById("minutes");
const secEl = document.getElementById("seconds");

const countTo = new Date();
countTo.setDate(countTo.getDate() + 9);
countTo.setHours(23, 59, 59, 999);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countTo.getTime() - now;

  if (distance <= 0) {
    dayEl.textContent = "00";
    hourEl.textContent = "00";
    minEl.textContent = "00";
    secEl.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  dayEl.textContent = String(days).padStart(2, "0");
  hourEl.textContent = String(hours).padStart(2, "0");
  minEl.textContent = String(minutes).padStart(2, "0");
  secEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
