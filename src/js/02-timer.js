import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const startBtnRef = document.querySelector("[data-start]");
const daysOutputRef = document.querySelector("[data-days]");
const hoursOutputRef = document.querySelector("[data-hours]");
const minutesOutputRef = document.querySelector("[data-minutes]");
const secondsOutputRef = document.querySelector("[data-seconds]");

startBtnRef.addEventListener("click", onStartBtnClick);

const dateInput = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      startBtnRef.disabled = false;
    }
  },
});

function onStartBtnClick() {
  const selectedDate = dateInput.selectedDates[0].getTime();

  const timerId = setInterval(() => {
    const currentDate = Date.now();
    const timeToFinish = selectedDate - currentDate;

    if (timeToFinish <= 1000) {
      clearInterval(timerId);
      Notiflix.Report.success("Congratulations!", "Time is over!!!", "Okay");
    }

    updateTimer(timeToFinish);
  }, 1000);
}

function updateTimer(timeLeft) {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  daysOutputRef.textContent = addLeadingZero(days);
  hoursOutputRef.textContent = addLeadingZero(hours);
  minutesOutputRef.textContent = addLeadingZero(minutes);
  secondsOutputRef.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
