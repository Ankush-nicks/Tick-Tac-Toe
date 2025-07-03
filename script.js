let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let newBtn = document.getElementById("new-btn");
let msgContainer = document.getElementById("msg-container");
let msg = document.getElementById("msg");

let turn = true;

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText !== "" &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
}

function showWinner(winner) {
  msg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  startCelebration();
}

function startCelebration() {
  let celebration = document.getElementById("celebration");
  for (let i = 0; i < 100; i++) {
    let confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = "hsl(" + Math.random() * 360 + ", 70%, 50%)";
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
    celebration.appendChild(confetti);
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

function resetGame() {
  turn = true;
  for (let box of boxes) {
    box.innerText = "";
  }
  msgContainer.classList.add("hide");
  document.getElementById("celebration").innerHTML = "";
}

for (let box of boxes) {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turn ? "X" : "O";
      if (!checkWinner()) {
        turn = !turn;
      }
    }
  });
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
