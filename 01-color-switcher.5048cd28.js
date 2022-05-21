const startBtnRef = document.querySelector("[data-start]");
const stopBtnRef = document.querySelector("[data-stop]");
const bodyRef = document.querySelector("body");
let switchColorTimerId = null;
startBtnRef.addEventListener("click", onStartBtnClick);
stopBtnRef.addEventListener("click", onStopBtnClick);
function onStartBtnClick() {
    switchColorTimerId = setInterval(()=>{
        bodyRef.style.backgroundColor = getRandomHexColor();
    }, 1000);
    changeDisabledBtn();
}
function onStopBtnClick() {
    clearInterval(switchColorTimerId);
    changeDisabledBtn();
}
function changeDisabledBtn() {
    startBtnRef.disabled = !startBtnRef.disabled;
    stopBtnRef.disabled = !stopBtnRef.disabled;
}
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//# sourceMappingURL=01-color-switcher.5048cd28.js.map
