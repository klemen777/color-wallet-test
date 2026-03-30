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

let currentIndex = 0;

// create swatches
colors.forEach((color, index) => {
  const div = document.createElement("div");
  div.className = "swatch";
  div.style.background = color;

  div.onclick = () => openFullscreen(index);

  grid.appendChild(div);
});

function openFullscreen(index) {
  currentIndex = index;
  fullscreen.style.display = "block";
  fullscreen.style.background = colors[index];

  requestAnimationFrame(() => {
    fullscreen.style.opacity = "1";
  });
}

closeBtn.onclick = () => {
  fullscreen.style.opacity = "0";

  setTimeout(() => {
    fullscreen.style.display = "none";
  }, 250);
};

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
