var timeLeft;
var intervalId;
var turnNumber = 0;
var waitTime = 5;
var right = 0, wrong = 0, blank = 0;
var answered = false;

var images = ["assets/images/answer1.png", "assets/images/answer2.png", "assets/images/answer3.png",
			  "assets/images/answer4.png", "assets/images/answer5.png", "assets/images/answer6.png",
			  "assets/images/answer7.png", "assets/images/answer8.png", "assets/images/answer9.png"];

var q1 = ["What is the name of Leela's pet?", 
	"Nobbler", "Nibbler", "Nubben", "Norman", 2];
var q2 = ["What company does Professor Farnsworth run?", 
	"Space Express", "Earth Express", "Planet Express", "Federal Express", 3];
var q3 = ["What is the name of Zapp Branigan's assistant?", 
	"Zip", "Kif", "Cif", "Yip", 2];
var q4 = ["Bender is bending unit #__", "20", "21", "22", "23", 3];
var q5 = ["When Fry returns to college, who is his roommate?", 
	"A monkey", "A dog", "Santa Claus", "Flexo", 1];
var q6 = ["What is Fry's favorite soft drink?", 
	"Slurm", "Slop", "Glurm", "Glop", 1];
var q7 = ["What instrument does Beelzebot play?", 
	"Holophonor", "Guitar", "Piano", "Fiddle", 4];
var q8 = ["What is the name of Planet Express' janitor?",
	"Scrubby", "Juan", "Scruffy", "Michelle", 3];
var q9 = ["Who is Professor Hubert Farnsworth's arch enemy?", 
	"Zapp Branigan", "Albert Einstein", "Mom", "Ogden Wernstrom", 4];

var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9];

function startTimer(seconds) {
	timeLeft = seconds;
	$("#timer").html(timeLeft);
	intervalId = setInterval(decrement, 1000);
}

function stop() {
	clearInterval(intervalId);
}

function wait() {

	waitTime--;

	if (waitTime === 0) {
		waitTime = 5;
		stop();
		if (turnNumber < (questions.length -1)) {
			turnNumber++;
			updatePage();
		}
		else {
			displayFinal();
		}
	}
}

function decrement() {
	timeLeft--;
	$("#timer").html(timeLeft);
	
	if (timeLeft === 0) {
		stop();
		answered = true;
		displayTimeout();
	}
}

function displayFinal() {
	$("#content2").hide();
	$("#content3").show();
	$("#question").html("Game Over!");
	$("#result").html("<p>Correct Answers: " + right +
		"</p><p>Incorrect Answers: " + wrong + "</p><p>Unanswered: " +
		blank);
	$("#image").hide();
	$("#startOver").show();
}

function displayTimeout() {
	blank++;
	$("#content2").hide();
	$("#image").attr("src", images[turnNumber]);
	$("#content3").show();
	$("#question").html("Out of Time!");
	$("#result").html("The correct answer was " + questions[turnNumber][questions[turnNumber][5]]);
	intervalId = setInterval(wait, 1000);
}

function displayRight() {
	right++;
	$("#content2").hide();
	$("#image").attr("src", images[turnNumber]);
	$("#content3").show();
	$("#question").html("Correct!");
	$("#result").html("Nice Job!");
	intervalId = setInterval(wait, 1000);
}

function displayWrong() {
	wrong++;
	$("#content2").hide();
	$("#image").attr("src", images[turnNumber]);
	$("#content3").show();
	$("#question").html("Incorrect!");
	$("#result").html("The correct answer was " + questions[turnNumber][questions[turnNumber][5]]);
	intervalId = setInterval(wait, 1000);
}

function updatePage() {
	startTimer(20);
	answered = false;
	$("#content2").show();
	$("#content3").hide();
	$("#question").html(questions[turnNumber][0]);
	$("#answer1").html(questions[turnNumber][1]);
	$("#answer2").html(questions[turnNumber][2]);
	$("#answer3").html(questions[turnNumber][3]);
	$("#answer4").html(questions[turnNumber][4]);
	$("#image").attr("src", "");
}

function startGame() {
	turnNumber = 0;
	right = 0;
	wrong = 0;
	blank = 0;
	$("#question").hide();
	$("#answer1").hide();
	$("#answer2").hide();
	$("#answer3").hide();
	$("#answer4").hide();
	$("#start").show();
	$("#image").show();
	$("#startOver").hide();
	$("#content1").hide();
	$("#content2").hide();
	$("#content3").hide();
}

startGame();

$("#start").on("click", function() {
	$("#start").hide();
	$("#content1").show();
	$("#question").show();
	$("#answer1").show();
	$("#answer2").show();
	$("#answer3").show();
	$("#answer4").show();
	updatePage(questions[turnNumber]);
});

$("#startOver").on("click", function() {
	startGame();
});

$(".solution").on("click", function() {
	if (!answered) {
		stop();

		if (questions[turnNumber][5] == this.attributes.value.value) {
			displayRight();
		}
		else {
			displayWrong();
		}
		answered = true;
	}
});