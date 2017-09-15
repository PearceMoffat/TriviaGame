var timeLeft;
var intervalId;
var turnNumber = 0;
var waitTime = 5;
// Variables to keep track of right, wrong, and unanswered questions
var right = 0, wrong = 0, blank = 0;
var answered = false;

// Images for the answers
var images = ["assets/images/answer1.png", "assets/images/answer2.png", "assets/images/answer3.png",
			  "assets/images/answer4.png", "assets/images/answer5.png", "assets/images/answer6.png",
			  "assets/images/answer7.png", "assets/images/answer8.png", "assets/images/answer9.png"];

// All the questions, possible answers, and a number representing the correct answer
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

// Array holding all the questions
var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9];

// Start a timer for "seconds" number of seconds
function startTimer(seconds) {
	timeLeft = seconds;
	$("#timer").html(timeLeft);
	intervalId = setInterval(decrement, 1000);
}
// Stop the timer
function stop() {
	clearInterval(intervalId);
}

// Function to wait for 5 seconds, called when answers are displayed
function wait() {

	waitTime--;
	if (waitTime === 0) {
		waitTime = 5;
		stop();
		// If there are still questions left, display the next one
		if (turnNumber < (questions.length -1)) {
			turnNumber++;
			updatePage();
		}
		// Otherwise display final page
		else {
			displayFinal();
		}
	}
}

// Function that decrements the timer by one, updates the timer, and stops the timer when the time is up
function decrement() {
	timeLeft--;
	$("#timer").html(timeLeft);
	
	if (timeLeft === 0) {
		stop();
		answered = true;
		displayTimeout();
	}
}

// Displays the final page showing the users score and button to reset the quiz
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

// Display the answer and appropriate message for when the user runs out of time on a question
function displayTimeout() {
	blank++;
	$("#content2").hide();
	$("#image").attr("src", images[turnNumber]);
	$("#content3").show();
	$("#question").html("Out of Time!");
	$("#result").html("The correct answer was " + questions[turnNumber][questions[turnNumber][5]]);
	intervalId = setInterval(wait, 1000);
}

// Display a page when the user answers a question correctly
function displayRight() {
	right++;
	$("#content2").hide();
	$("#image").attr("src", images[turnNumber]);
	$("#content3").show();
	$("#question").html("Correct!");
	$("#result").html("Nice Job!");
	intervalId = setInterval(wait, 1000);
}

// Display the answer and an appropriate message when the user answers a question incorrectly
function displayWrong() {
	wrong++;
	$("#content2").hide();
	$("#image").attr("src", images[turnNumber]);
	$("#content3").show();
	$("#question").html("Incorrect!");
	$("#result").html("The correct answer was " + questions[turnNumber][questions[turnNumber][5]]);
	intervalId = setInterval(wait, 1000);
}

// Update the page with the current question
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

// Reset all variables tracking correct/incorrect/unanswered questions and the turn number
// Show and hide appropriate divs for the beginning of the game
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

// Initialize the game
startGame();

// Begin the quiz when the start button is clicked
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

// Return to the start screen when the start over button is clicked
$("#startOver").on("click", function() {
	startGame();
});

// Run whenever an answer button is clicked
$(".solution").on("click", function() {
	if (!answered) { // Make sure question is not already answered
		stop(); // Stop the timer when a question is answered

		// If the question was answered correctly...
		if (questions[turnNumber][5] == this.attributes.value.value) {
			displayRight();
		}
		// If the question was answered incorrectly...
		else {
			displayWrong();
		}
		answered = true;
	}
});