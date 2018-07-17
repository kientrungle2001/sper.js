function define(str, value) {
	window[str]		= 	value;
}

//define class
define('CLASS3', 	3);
define('CLASS4', 	4);
define('CLASS5', 	5);

//thoi gian lam bai
define('QUESTIONTIME', 15);

//Thời gian làm bài
define('WORK_TIME15', 		15);
define('WORK_TIME30', 		30);
define('WORK_TIME45', 		45);
define('WORK_TIME60', 		60);
define('NUM_QUESTION', 		10);

// url cac trang
define('FL_URL', 	'http://test1.vn');
define('NOBEL_URL', 'http://nobel.vn');

//Độ khó
define('EASY', 				1);
define('NORMAL', 			2);
define('HARD', 				3);
define('VERYHARD', 			4);
define('SUPERHARD', 		5);