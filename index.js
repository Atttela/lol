const deadline = new Date('2026-01-01T00:00:00');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
function countdown() {
 
    const now = new Date();

    const diff = deadline - now;


    if (diff <= 0) {
        clearInterval(timerInterval); 
        daysEl.textContent = 0;
        hoursEl.textContent = 0;
        minutesEl.textContent = 0;
        secondsEl.textContent = 0;
        return; 
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}
const timerInterval = setInterval(countdown, 1000);

countdown();


// ниже идет пианино
const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying"),
  hints = document.querySelectorAll(".hints");

function playNote(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!key) return;

  const keyNote = key.getAttribute("data-note");

  key.classList.add("playing");
  note.innerHTML = keyNote;
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function hintsOn(e, index) {
  e.setAttribute("style", "transition-delay:" + index * 50 + "ms");
}

hints.forEach(hintsOn);

keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playNote);

// начало веревочки



const cord = document.getElementById('pullCord');
const overlay = document.getElementById('overlay');

let isDragging = false;
let startY = 0;

cord.addEventListener('mousedown', e => {
  e.preventDefault();
  isDragging = true;
  startY = e.clientY;
  cord.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', e => {
  if (!isDragging) return;
  isDragging = false;
  cord.style.cursor = 'grab';
  const delta = e.clientY - startY;
  if (delta > 50) {
    overlay.classList.add('off');
  }
  cord.style.height = '100px';
});

window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const delta = Math.max(0, e.clientY - startY);
  cord.style.height = `${100 + delta}px`;
});


const img = document.querySelector('.runner');

img.addEventListener('click', () => {
  if (!img.classList.contains('running')) {
    img.classList.add('running');
  }
});
