
$(function() {

	$(".start").click(function(event) {
		event.preventDefault();
		let minutes = parseInt($("input").val());
		let seconds = 0;
		$(this).prop("disabled", true);

		chrome.runtime.sendMessage({minutes, seconds});
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	displayTime(request.minutes, request.seconds);
});

function displayTime(minutes, seconds) {
	let m = (minutes < 10) ? "0" + minutes : minutes;
	let s = (seconds < 10) ? "0" + seconds : seconds;
	$(".remaining").text(m+":"+s);
}