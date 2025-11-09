import "./style.css";
const timerDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const audio = document.getElementById("myAudio");
const breakOption = document.getElementById("break-select");
const totalOption = document.getElementById("total-select");
const toggleThemeBtn = document.getElementById("toggle-theme");

let totalTime = 1500;
let timerInterval = null;
let breakTimeInterval = null;
let isRunning = false;
let breakTime = 300;
// Check system theme
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
  toggleThemeBtn.textContent = "Dark mode";
} else {
  document.documentElement.classList.remove("dark");
  toggleThemeBtn.textContent = "Light mode";
}
// Toggle theme
toggleThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  toggleThemeBtn.textContent = isDark ? "Dark mode" : "Light mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
// Display timer
function updateDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}
// Handle timer
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  clearInterval(breakTimeInterval);
  timerDisplay.classList.add("text-green-500");
  timerDisplay.classList.remove("text-red-500");
  timerInterval = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      updateDisplay(totalTime);
    } else {
      clearInterval(timerInterval);
      isRunning = false;
      audio.play();
      setTimeout(function () {
        audio.ended();
      }, 10000);
      alert("Nghỉ tý đi cu ơi");
      startBreak();
    }
  }, 1000);
}
function pauseTimer() {
  clearInterval(timerInterval);
  clearInterval(breakTimeInterval);
  isRunning = false;
  timerDisplay.classList.add("text-red-500");
  timerDisplay.classList.remove("text-green-500");
}
function resetTimer() {
  clearInterval(breakTimeInterval);
  clearInterval(timerInterval);
  totalTime = 1500;
  isRunning = false;
  updateDisplay(totalTime);
  timerDisplay.classList.remove("text-green-500");
  timerDisplay.classList.remove("text-red-500");
}
// Handle break time
function startBreak() {
  timerDisplay.classList.remove("text-green-500");
  let temp = breakTime;
  breakTimeInterval = setInterval(() => {
    if (breakTime > 0) {
      breakTime--;
      updateDisplay(breakTime);
    } else {
      clearInterval(breakTimeInterval);
      isRunning = false;
      audio.play();
      setTimeout(function () {
        audio.ended();
      }, 10000);
      alert("Tiếp tục đi cu ơi");
      startTimer();
    }
  }, 1000);
  breakTime = temp;
}

updateDisplay(totalTime);

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
breakOption.addEventListener("change", function () {
  breakTime = breakOption.value;
});
totalOption.addEventListener("change", function () {
  totalTime = totalOption.value;
  updateDisplay(totalTime);
});
