let questionListUrl = window.location.pathname + '.json';
let questionList;
let questionPointer = 0;
let gameOver = false;
let timerBar = 0;
let gameStartTime;

let userScore = 0;
let userStrike = 0;

// on document ready, the current function will be get executed
jQuery(function() {
  // the list of questions will be fetched
  $.ajax({
    url: questionListUrl,
  }).done(function(response) {

    questionList = response;
    loadFirstQuestion();
  }).fail(function(jqXHR, textStatus, errorThrown) {

    alert("Your request cannot be proceed at this time, Please try again later!");
  });

  $('button').one('click', function(e) {
    gameStartTime = new Date();
  });

  // user inputs are assessed and respective states are updated
  $('button').on('click', function(e) {
    resetTimer();

    if (e.currentTarget.id === "ude" && questionList[questionPointer]['answer'] === true) {
      updateScore();
    } else if (e.currentTarget.id === "na-ude" && questionList[questionPointer]['answer'] === false) {
      updateScore();
    } else {
      updateStrike();
    }
  });
});

// responsible to generate timing slider
function resetTimer() {
  clearInterval(timerBar);

    var timer = $('#timer')[0];
    var timerWidth = 0;
    timerBar = setInterval(frame, 30);

    function frame() {
      if (timerWidth >= 100) {
        $('#btn-mock').triggerHandler('click');
      } else {
        timerWidth++;
        timer.style.width = timerWidth + "%";
      }
    }
}

function getUserId() {
  return window.location.pathname.split("/")[2];
}

function loadFirstQuestion() {
  var firstQuestion = questionList[questionPointer]['statement'];
  $('#question').empty().append(firstQuestion);
}

function changeQuestion() {
  if (questionPointer === questionList.length-1) {
    finishGame();
  }

  var newQuestion = questionList[++questionPointer]['statement'];
  $('#question').empty().append(newQuestion);
}

function updateScore() {
  vibrateDevice(window.gameVibration.scoreVibration);
  userScore += 5;
  $('#score-stat').empty().append(userScore);
  changeQuestion();
}

function updateStrike() {
  vibrateDevice(window.gameVibration.strikeVibration);
  userStrike += 1;
  $('#strike-stat').empty().append(userStrike);

  if (userStrike == 3) {
    finishGame();
  }
  changeQuestion();
}

// Vibrates the device if it supports to do so
// The ScoreBoard will get saved for the same user and will be deactivated to prevent further activities
function finishGame() {
  vibrateDevice(window.gameVibration.gameOverVibration);
  insertScoreBoard();
}

// Vibrates the device
function vibrateDevice(vibrateAmount) {
  window.navigator.vibrate?.(vibrateAmount);
}

// The ScoreBoard will get saved for the same user
function insertScoreBoard() {
  newScoreBoardUrl = "/users/" + getUserId() + "/score_boards";
  gameEndTime = new Date();

  userScoreBoard = {
    score_board: {
      user_id: getUserId(),
      score: $('#score-stat')[0].innerHTML,
      strike: $('#strike-stat')[0].innerHTML,
      time_taken: (gameEndTime - gameStartTime) / 1000,
    }
  };

  $.ajax({
    type: "POST",
    url: newScoreBoardUrl,
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: userScoreBoard

  }).done(function(response) {
    deactivateUser();
  }).fail(function(jqXHR, textStatus, errorThrown) {
    alert("Couldn't save score, Please try again later!");
  });
}

// The User will get deactivated after its ScoreBoard been saved
function deactivateUser(url) {
  deactivateUserUrl = "/users/" + getUserId();

  $.ajax({
    type: "PATCH",
    url: deactivateUserUrl,
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},

  }).done(function(response) {
    alert("Thanks for playing! Your Score: " + userScoreBoard.score_board.score);
    window.location.href = "/";
  }).fail(function (jqXHR, textStatus, errorThrown) {
    alert("User lock couldn't be completed!");
  });
}
