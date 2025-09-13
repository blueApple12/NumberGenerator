// RNG with covert fixed prefix + theme toggle, mobile-friendly (no meta).

const fixedSequence = [9, 4, 6, 5]; // change/extend as needed
const RANDOM_MIN = 0;
const RANDOM_MAX = 9;

let idx = 0;

const displayEl = document.getElementById('display');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

// Theme
const htmlEl = document.documentElement;
const darkBtn = document.getElementById('darkBtn');
const lightBtn = document.getElementById('lightBtn');

function randint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextNumber() {
  if (idx < fixedSequence.length) {
    return fixedSequence[idx++];
  }
  return randint(RANDOM_MIN, RANDOM_MAX);
}

function render(n) {
  displayEl.textContent = String(n);
}

function generate() {
  render(nextNumber());
}

function copyToClipboard() {
  const val = displayEl.textContent.trim();
  if (!val || val === "—") return;
  navigator.clipboard.writeText(val).catch(() => {});
}

/* Theme handling */
const THEME_KEY = "rng_theme_pref";

function applyTheme(mode) {
  htmlEl.setAttribute("data-theme", mode);
  const isDark = mode === "dark";
  darkBtn.classList.toggle("is-active", isDark);
  lightBtn.classList.toggle("is-active", !isDark);
  darkBtn.setAttribute("aria-pressed", String(isDark));
  lightBtn.setAttribute("aria-pressed", String(!isDark));
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    applyTheme(saved);
  } else {
    applyTheme("dark"); // default
  }
}

darkBtn.addEventListener("click", () => {
  applyTheme("dark");
  localStorage.setItem(THEME_KEY, "dark");
});
lightBtn.addEventListener("click", () => {
  applyTheme("light");
  localStorage.setItem(THEME_KEY, "light");
});

/* Wire up controls */
generateBtn.addEventListener('click', generate);
copyBtn.addEventListener('click', copyToClipboard);

// Keyboard shortcuts: Enter/Space to generate, "c" to copy
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    generateBtn.click();
  } else if (e.key.toLowerCase() === 'c') {
    e.preventDefault();
    copyBtn.click();
  }
});

/* init */
initTheme();
