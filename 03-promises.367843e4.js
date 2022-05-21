const fromRef = document.querySelector(".form");
const firstDelayInputRef = document.querySelector('[name="delay"]');
const stepInputRef = document.querySelector('[name="step"]');
const amountDelayInputRef = document.querySelector('[name="amount"]');
fromRef.addEventListener("submit", onPromisesGenerate);
function onPromisesGenerate(e) {
    e.preventDefault();
    let delay1 = Number(firstDelayInputRef.value);
    const delayStep = Number(stepInputRef.value);
    const promisesAmount = Number(amountDelayInputRef.value);
    for(let i = 1; i <= promisesAmount; i++){
        createPromise(i, delay1).then(({ position , delay  })=>console.log(`✅ Fulfilled promise ${position} in ${delay}ms`)
        ).catch(({ position , delay  })=>console.log(`❌ Rejected promise ${position} in ${delay}ms`)
        );
        delay1 += delayStep;
    }
}
function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if (shouldResolve) resolve({
                position,
                delay
            });
            reject({
                position,
                delay
            });
        }, delay);
    });
}

//# sourceMappingURL=03-promises.367843e4.js.map
