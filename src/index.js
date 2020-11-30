const gameData = {
  computerNumbers: -1,
  isSuccess: false,
};

export default function BaseballGame() {
  this.play = function (computerInputNumbers, userInputNumbers) {
    return "결과 값 String";
  };
}

const getUserInput = () => {};

const makeComputerInput = () => {
  const nums = [];
  let digit = Math.floor(Math.random() * 10);
  for (let i = 0; i < 3; i++) {
    while (nums.includes(digit)) digit = Math.floor(Math.random() * 10);
    nums.push(digit);
  }
  return nums.join("");
};

const init = () => {
  gameData.isSuccess = false;
  gameData.computerNumbers = makeComputerInput();
  document.getElementById("submit").addEventListener("click", getUserInput);
};

document.addEventListener("DOMContentLoaded", function () {
  init();
});
