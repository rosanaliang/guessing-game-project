$(document).ready(function(){
	var winningNumber = generateRandomNumber(1, 100);
	console.log("Winning Number: " + winningNumber);
	var guessArray = [];

	$('#submitButton').on('click', function(){
		onPlayersGuessSubmission(guessArray, winningNumber);
		$('#submission').val('');
	});		
	$('#submission').keypress(function(e){
		if (e.which === 13){
			onPlayersGuessSubmission(guessArray, winningNumber);
			$('#submission').val('');
		}
	});
	$('#giveMeAHint').on('click', function(){
		provideHint(winningNumber, guessArray);
	});
	$('#playAgain').click(function(){
		playAgain();
	});
});

function generateRandomNumber(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function onPlayersGuessSubmission(guessArray, winningNumber){ 
	if (guessArray.length === 5 || guessArray[guessArray.length - 1] === winningNumber){
		return;
	}

	var playersGuess = parseInt($('#submission').val());

	if (isNaN(playersGuess) === true || playersGuess > 100 || playersGuess < 1) {
		$('h2').text("YOUR NUMBER IS NOT BETWEEN 1 AND 100").css({'color': '#F15539'});
		return;
	}

	if (isDuplicate(guessArray, playersGuess) === true){
		$('h2').text("YOU ALREADY PICKED THAT NUMBER").css({'color': '#F15539'});
		return;
	}

	guessArray.push(playersGuess);

	if (checkGuess(playersGuess, winningNumber) === true){
		showWinningUI();
	} else {
		$('h2').text("GUESS AGAIN").css({'color': '#F15539'});
		showLowerOrHigher(playersGuess, winningNumber);

		if (guessArray.length === 4){
			$('#guessesRemaining').text((5 - guessArray.length) + ' Guess Remaining');
		} else if (guessArray.length === 5) {
			showLosingUI();
			return;
		} else {
			$('#guessesRemaining').text((5 - guessArray.length) + ' Guesses Remaining');
		}
	}

}

function showWinningUI(){
	$('h2').text("YOU WIN!").css({'color': '#FFFFFF'});
	$('button').css({'color': '#63c7f9'});
	$('#status').text('');
	$('#hint').text('');
	$('#guessesRemaining').text('');
	$('body').css({'background-image': 'url(images/geometry3.png)'});
}

function showLosingUI(){
	$('h2').text("GAME OVER!").css({'color': '#FFFFFF'});
	$('button').css({'color': '#F15539'});
	$('#status').text('');
	$('#hint').text('');
	$('#guessesRemaining').text('');
	$('body').css({'background-image': 'url(images/geometry4.png)'});
}

function isDuplicate(guessArray, playersGuess){
	for (var i in guessArray){
		if (guessArray[i] === playersGuess) {
			return true;
		}
	}
	return false;
}

function showLowerOrHigher(playersGuess, winningNumber){
	var distance = Math.abs(playersGuess - winningNumber);
	if (distance <= 5) {
		$('#status').text('You are really close!');
	} else if (playersGuess > winningNumber) {
		$('#status').text('The number you guessed is too big');
	} else { 
		$('#status').text('The number you guessed is too small');
	}
}

function checkGuess(playersGuess, winningNumber){
	if (playersGuess === winningNumber) {
		return true;
	} else {
		return false;
	}
}

function provideHint(winningNumber, guessArray){
	if (guessArray.length === 5 || guessArray[guessArray.length - 1] === winningNumber) {
		return;
	}
	$('#hint').text('The winning number is close to ' + (winningNumber - generateRandomNumber(1, 10)));
}

function playAgain(){
	location.reload();
}




