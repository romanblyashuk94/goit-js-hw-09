import Notiflix from "notiflix";

const fromRef = document.querySelector(".form");
const firstDelayInputRef = document.querySelector('[name="delay"]');
const stepInputRef = document.querySelector('[name="step"]');
const amountDelayInputRef = document.querySelector('[name="amount"]');

fromRef.addEventListener("submit", onCreatePromisesBtnClick);

function onCreatePromisesBtnClick(e) {
  e.preventDefault();
  let delay = Number(firstDelayInputRef.value);
  const delayStep = Number(stepInputRef.value);
  const promisesAmount = Number(amountDelayInputRef.value);

  runPromisesGenerator(delay, delayStep, promisesAmount);
}

function runPromisesGenerator(delay, delayStep, promisesAmount) {
  for (let i = 1; i <= promisesAmount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}
