
$(function() {
	// here openTime is called from the background.js with current time in minutes and seconds
	// without this variable and logic, whenever user opens popup, for a second minutes:seconds is 00:00 and then changes
	let openTime = chrome.extension.getBackgroundPage().openTime;

	displayTime(openTime.minutes, openTime.seconds);

	$(".start").click(function(event) {
		event.preventDefault();
		let minutes = parseInt($("input").val());
		if (isNaN(minutes) || minutes === 0) {
			minutes = 1;
		} else if (minutes > 60) {
			minutes = 60;
		}
		let seconds = 0;
		if ($(this).attr("class").indexOf("non-clickable") < 0) {
			chrome.runtime.sendMessage({minutes, seconds});
			$("input").val();
			$(this).addClass("non-clickable");
		}
	});
});

// chrome method for listening messages from the background page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	displayTime(request.minutes, request.seconds);
});

function displayTime(minutes, seconds) {
	let m = (minutes < 10) ? "0" + minutes : minutes;
	let s = (seconds < 10) ? "0" + seconds : seconds;
	$(".remaining").text(m+":"+s);
}