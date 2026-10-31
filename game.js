
//alert("hello");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence() {

  userClickedPattern = [];

  level++;


  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);


  var randomChosenColour = buttonColours[randomNumber];


  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChosenColour);
}


$(".btn").on("click", function () {


  var userChosenColour = $(this).attr("id");

  if (!started) {
    return;
  }


  userClickedPattern.push(userChosenColour);


  console.log("userClickedPattern:", userClickedPattern);


  playSound(userChosenColour);


  animatePress(userChosenColour);


  checkAnswer(userClickedPattern.length - 1);
});



function playSound(name) {


  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {


  $("#" + currentColour).addClass("pressed");


  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


$(document).on("keydown", function () {


  if (!started) {


    $("#level-title").text("Level " + level);

  
    nextSequence();


    started = true;
  }
});



function checkAnswer(currentLevel) {


  console.log("userClickedPattern:", userClickedPattern);
  console.log("gamePattern:", gamePattern);


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


    console.log("success");

  
    if (userClickedPattern.length === gamePattern.length) {

 
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

  
    console.log("wrong");


    playSound("wrong");


    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

  
    $("#level-title").text("Game Over, Press Any Key to Restart");

  
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
