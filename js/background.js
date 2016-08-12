var totalSeconds = 0;
var clicked = false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	totalSeconds = request.minutes * 60 + request.seconds;
	clicked = true;
});

setInterval(function() {
	if (totalSeconds > 0) {
		totalSeconds--;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		chrome.runtime.sendMessage({minutes, seconds});
	} else {

		if (clicked) {
			chrome.windows.getAll({}, function(windows){
  				for(let i = 0; i < windows.length; i++)
    				chrome.windows.remove(windows[i].id);
			});
			clicked = false;
		}
	}
}, 1000);