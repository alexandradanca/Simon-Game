const buttonColour = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let randomClik = nextRandom();
let level = 0;
let gameNextStep = 0;
let maxScore = 0;

$(document).ready(function ($) {
  $(window).on("keypress", function () {
    if (level === 0) {
      reactivateKeypress();
    }
  });

  $(".color-c").click(function () {
    if (level !== 0) {
      let userClick = $(this).attr("id");
      actionBtnUser(userClick, userClickedPattern);
      $(this).toggleClass("clicked");
      setTimeout(() => {
        $(this).toggleClass("clicked");
      }, 100);
      checkAnswer();
    }
  });
});

function checkAnswer() {
  if (userClickedPattern.length - 1 < gamePattern.length - 1) {
    if (gamePattern[gameNextStep] === userClickedPattern[gameNextStep]) {
      gameNextStep++;
    } else {
      gameOver();
    }
  } else if (userClickedPattern.length - 1 === gamePattern.length - 1) {
    if (gamePattern[gameNextStep] === userClickedPattern[gameNextStep]) {
      gameNextStep = 0;
      level++;
      userClickedPattern = [];
      randomClik = nextRandom();
      actionBtn(randomClik, gamePattern);
      $(".color-c")
        .filter("." + buttonColour[randomClik])
        .delay(800)
        .fadeOut(100)
        .fadeIn(100);
      $("h1").text("Level " + level);
    } else {
      gameOver();
    }
  }
}

function reactivateKeypress() {
  gameNextStep = 0;
  gamePattern = [];
  userClickedPattern = [];
  $(window).off("keypress");
  randomClik = nextRandom();
  actionBtn(randomClik, gamePattern);
  $(".color-c")
    .filter("." + buttonColour[randomClik])
    .fadeOut(100)
    .fadeIn(100);
  level = 1;
  $("h1").text("Level " + level);
}

function gameOver() {
  $("h1").text("Game Over! Press Any Key to Restart");
  $("body").toggleClass("gameOver");
  setTimeout(() => {
    $("body").toggleClass("gameOver");
  }, 200);
  playSound("wrong");
  maxScore = checkMaxScore(maxScore, level - 1);
  $("h3").text("Highest: " + maxScore);
  level = 0;
  $(window).on("keypress", function () {
    reactivateKeypress();
  });
}

function checkMaxScore(lastMaxScore, newScore) {
  if (lastMaxScore < newScore) {
    lastMaxScore = newScore;
  }

  return lastMaxScore;
}

function nextRandom() {
  let randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

function playSound(name) {
  var audio = new Audio("/sounds/" + name + ".mp3");
  audio.play();
}

function actionBtn(btn, pushToArr) {
  let x = buttonColour[btn];
  pushToArr.push(x);
  if (level > 1) {
    setTimeout(function () {
      playSound(x);
    }, 800);
  } else {
    playSound(x);
  }
}

function actionBtnUser(btn, pushToArr) {
  let x = btn;
  pushToArr.push(x);
  playSound(x);
}
