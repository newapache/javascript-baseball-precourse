const gameData = {
  computerNumbers: -1,
  isSuccess: false,
};

export default function BaseballGame() {
  this.play = function (computerInputNumbers, userInputNumbers) {
    return compareNums(computerInputNumbers, userInputNumbers);
  };
}

const findLocation = (target, nums) => {
  const numArray = nums.split("");
  const idx = numArray.findIndex((num) => num === target);

  return idx;
};

const compareNums = (computerNum, inputNum) => {
  let ball = 0;
  let strike = 0;
  let resultString = "";

  for (let i = 0; i <= inputNum.length; i++) {
    let idx = findLocation(inputNum[i], computerNum);
    if (idx === -1) {
      continue;
    } else if (idx === i) {
      strike++;
    } else {
      ball++;
    }
  }

  if (strike === 3 && ball === 0) {
    gameData.isSuccess = true;
  } else if (strike === 0 && ball === 0) {
    resultString = "낫싱";
  } else if (strike !== 0 && ball === 0) {
    resultString = `${strike}스트라이크`;
  } else if (strike === 0 && ball !== 0) {
    resultString = `${ball}볼`;
  } else {
    resultString = `${ball}볼 ${strike}스트라이크`;
  }

  return resultString;
};

const resetResult = () => {
  document
    .getElementById("game-restart-button")
    .addEventListener("click", function () {
      document.getElementById("result").innerHTML = "";
      document.getElementById("user-input").value = "";
    });
};

const updateResult = (result) => {
  if (gameData.isSuccess) {
    document.getElementById("result").innerHTML = `
  <div><span>🎉</span> <strong>정답을 맞추셨습니다!</strong> <span>🎉</span></div>
  <span>게임을 새로 시작하시겠습니까?</span>
  <button id="game-restart-button">게임 재시작</button>
  `;
    resetResult();
    init();
  } else {
    document.getElementById("result").innerHTML = result;
  }
};

const validateInput = (input) => {
  const inputArray = input.split("");
  let isValidate = true;

  if (input.length !== 3 || input.includes("0") || isNaN(parseInt(input))) {
    isValidate = false;
  }
  if (new Set(inputArray).size !== inputArray.length) {
    isValidate = false;
  }

  return isValidate;
};

const getUserInput = () => {
  let userInput = document.getElementById("user-input").value;

  if (!validateInput(userInput)) {
    alert("세 자리의 중복 없는 숫자를 다시 입력해주세요.");
    document.getElementById("user-input").value = "";
    document.getElementById("result").innerHTML = "";
  } else {
    let result = new BaseballGame().play(gameData.computerNumbers, userInput);
    console.log(result, gameData.computerNumbers);
    updateResult(result);
  }
};

const makeComputerInput = () => {
  let nums = [];
  let digit = Math.floor(Math.random() * 9) + 1;

  for (let i = 0; i < 3; i++) {
    while (nums.includes(digit)) {
      digit = Math.floor(Math.random() * 9) + 1;
    }
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
