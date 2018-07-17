var question_audios = {};
var current_sound = null;
var current_sound_url = null;
function read_question(elem, url) {
	if(current_sound) {
		current_sound.pause();
		current_sound.currentTime = 0;
		current_sound.onended();
	}
	if(current_sound_url == url) {
		current_sound_url = null;
		return ;
	} else {
		current_sound_url = url;
	}
	$(elem).removeClass('glyphicon-volume-up').addClass('glyphicon-volume-off');
	if(1 || typeof question_audios[url] == 'undefined') {
		sound = new Audio(url);
		sound.loop = false;	
		question_audios[url] = sound;
		sound.onended = function() {
			$(elem).removeClass('glyphicon-volume-off').addClass('glyphicon-volume-up');
		};
	}
	current_sound = question_audios[url];
	fetch(url)
    .then(function() {
      question_audios[url].play();
    });
	
}