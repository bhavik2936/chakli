let questionListUrl = window.location.pathname + '.json';
let questionList;
let questionPointer = 0;
let gameOver = false;

let userScore = 0;
let userStrike = 0;

jQuery(function() {
  $.ajax({
    url: questionListUrl,
  }).done(function(response) {

    questionList = response;
    loadFirstQuestion();
  }).fail(function(jqXHR, textstatus, errorThrown) {

    alert("Your request cannot be proceed at this time, Please try again later!");
  });

  $('button').on('click', function(e) {
    
    if (e.currentTarget.id === "ude" && questionList[questionPointer]['answer'] === true) {
      updateScore();
    } else if (e.currentTarget.id === "na-ude" && questionList[questionPointer]['answer'] === false) {
      updateScore();
    } else if (userStrike !== 2 ) {
      updateStrike();
    } else {
      finishGame();
    }

    if (gameOver) {
      finishGame();
    } else {
      changeQuestion();
    }
  });
});

function getUserId() {
  return window.location.pathname.split("/")[2];
}

function loadFirstQuestion() {
  var firstQuestion = questionList[questionPointer]['statement'];
  $('#question').empty().append(firstQuestion);
}

function changeQuestion() {
  var newQuestion = questionList[++questionPointer]['statement'];
  $('#question').empty().append(newQuestion);

  if (questionPointer === questionList.length-1) {
    gameOver = true;
  }
}

function updateScore() {
  userScore += 5;
  $('#score-stat').empty().append(userScore);
}

function updateStrike() {
  userStrike += 1;
  $('#strike-stat').empty().append(userStrike);
}

function finishGame() {
  newScoreBoardUrl = "/users/" + getUserId() + "/score_boards";
  userScoreBoard = {
    score_board: {
      user_id: getUserId(),
      score: $('#score-stat')[0].innerHTML,
      strike: $('#strike-stat')[0].innerHTML,
    }
  };

  $.ajax({
    type: "POST",
    url: newScoreBoardUrl,
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    data: userScoreBoard
  }).done(function(response) {

    alert("Thanks for playing! Your Score: " + userScore);
    window.location.href = "/";
  }).fail(function(jqXHR, textstatus, errorThrown) {

    alert("Score cannot be saved at this moment!");
  });

}
