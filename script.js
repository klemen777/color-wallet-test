// PASSWORD (CHANGE THIS)
const PASSWORD = "cw-8392";

// elements
const loginScreen = document.getElementById("loginScreen");
const appContent = document.getElementById("appContent");

// check if already unlocked
if (localStorage.getItem("unlocked") === "true") {
  loginScreen.style.display = "none";
  appContent.style.display = "flex";
  requestAnimationFrame(syncTintLogoPosition);
}

// password function
function checkPassword() {
  const input = document.getElementById("passwordInput").value;

  if (input === PASSWORD) {
    localStorage.setItem("unlocked", "true");

    loginScreen.style.display = "none";
    appContent.style.display = "flex";
    requestAnimationFrame(syncTintLogoPosition);
  } else {
    alert("Wrong password");
  }
}

const colors = [
  "#050607", "#313A40", "#55555A", "#808088", "#B0ACBA", "#5A494A",
  "#F6F177", "#D6D4E3", "#F9CEE1", "#CF2041", "#76113F", "#841643",
  "#AE3855", "#DE496E", "#E55594", "#F18AB6", "#FFFFFF", "#B7E3E9",
  "#179C8F", "#0A7F86", "#135A63", "#1793A6", "#74BADA", "#4685BF",
  "#5B91CC", "#4D6BB1", "#5973B4", "#3F4282", "#283489", "#262B68",
  "#343264", "#564090", "#6156A4", "#623788", "#AF9FC8", "#8B4C99",
  "#642B62", "#923592", "#992477", "#C72E8B"
];

const grid = document.getElementById("grid");
const fullscreen = document.getElementById("fullscreen");
const closeBtn = document.getElementById("close");
const layoutToggle = document.getElementById("layoutToggle");
const layoutScreen = document.getElementById("layoutScreen");
const layoutStripes = document.getElementById("layoutStripes");
const layoutClose = document.getElementById("layoutClose");
const logoSpinButton = document.getElementById("logoSpinButton");
const homeTintAnchor = document.getElementById("homeTintAnchor");
const centerTintAnchor = document.getElementById("centerTintAnchor");
const sharedTintLogo = document.getElementById("sharedTintLogo");
const clientLogo = document.getElementById("clientLogo");

let currentIndex = 0;
let isLayoutOpen = false;
let isFullscreenOpen = false;

// create swatches
colors.forEach((color, index) => {
  const div = document.createElement("div");
  div.className = "swatch";
  div.style.background = color;

  div.onclick = () => openFullscreen(index);

  grid.appendChild(div);
});

colors.forEach((color) => {
  const stripe = document.createElement("div");
  stripe.className = "layout-stripe";
  stripe.style.background = color;
  layoutStripes.appendChild(stripe);
});

function applyTintLogoPosition(target) {
  const homeRect = homeTintAnchor.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const zimaRect = clientLogo.getBoundingClientRect();
  const tintHeight = sharedTintLogo.getBoundingClientRect().height;
  const x = target === centerTintAnchor
    ? targetRect.left
    : homeRect.left;
  const y = (zimaRect.top + (zimaRect.height / 2)) - (tintHeight / 2);

  sharedTintLogo.style.transform = `translate(${x}px, ${y}px)`;
  sharedTintLogo.style.opacity = "1";
}

function syncTintLogoPosition() {
  if (loginScreen.style.display !== "none") {
    sharedTintLogo.style.opacity = "0";
    return;
  }

  const target = (isLayoutOpen || isFullscreenOpen) ? centerTintAnchor : homeTintAnchor;
  layoutToggle.style.transform = "none";
  const buttonRect = layoutToggle.getBoundingClientRect();
  const zimaRect = clientLogo.getBoundingClientRect();
  const sideTop = zimaRect.top + (zimaRect.height / 2) - (buttonRect.height / 2);

  layoutToggle.style.transform = `translateY(${sideTop - buttonRect.top}px)`;
  applyTintLogoPosition(target);
}

function openFullscreen(index) {
  currentIndex = index;
  isFullscreenOpen = true;
  fullscreen.style.display = "block";
  fullscreen.style.background = colors[index];

  requestAnimationFrame(() => {
    fullscreen.style.opacity = "1";
    syncTintLogoPosition();
  });
}

closeBtn.onclick = () => {
  isFullscreenOpen = false;
  syncTintLogoPosition();
  fullscreen.style.opacity = "0";

  setTimeout(() => {
    fullscreen.style.display = "none";
    syncTintLogoPosition();
  }, 250);
};

layoutToggle.onclick = () => {
  applyTintLogoPosition(homeTintAnchor);
  layoutScreen.classList.add("is-visible");
  isLayoutOpen = true;

  requestAnimationFrame(() => {
    layoutScreen.style.opacity = "1";
    syncTintLogoPosition();
  });
};

layoutClose.onclick = () => {
  isLayoutOpen = false;
  syncTintLogoPosition();
  layoutScreen.style.opacity = "0";

  setTimeout(() => {
    layoutScreen.classList.remove("is-visible");
    syncTintLogoPosition();
  }, 250);
};

logoSpinButton.onclick = () => {
  clientLogo.classList.remove("is-spinning");
  void clientLogo.offsetWidth;
  clientLogo.classList.add("is-spinning");
};

clientLogo.addEventListener("animationend", () => {
  clientLogo.classList.remove("is-spinning");
});

// swipe support
let startX = 0;

fullscreen.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

fullscreen.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) nextColor();
  if (endX - startX > 50) prevColor();
});

function nextColor() {
  currentIndex = (currentIndex + 1) % colors.length;
  fullscreen.style.background = colors[currentIndex];
}

function prevColor() {
  currentIndex = (currentIndex - 1 + colors.length) % colors.length;
  fullscreen.style.background = colors[currentIndex];
}

window.addEventListener("resize", syncTintLogoPosition);
window.addEventListener("load", syncTintLogoPosition);

if (localStorage.getItem("unlocked") === "true") {
  syncTintLogoPosition();
}
