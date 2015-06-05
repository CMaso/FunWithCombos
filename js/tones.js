var tonesApp = angular.module("tonesApp", []);

tonesApp.controller('TonesCtrl', function($scope) {
	$scope.player = {
		tones : {
		    0 : 'http://upload.wikimedia.org/wikipedia/commons/2/2d/Dtmf0.ogg',
		    1 : 'http://upload.wikimedia.org/wikipedia/commons/b/bf/Dtmf1.ogg',
		    2 : 'http://upload.wikimedia.org/wikipedia/commons/7/7d/Dtmf2.ogg',
		    3 : 'http://upload.wikimedia.org/wikipedia/commons/2/28/Dtmf3.ogg',
		    4 : 'http://upload.wikimedia.org/wikipedia/commons/9/9f/Dtmf4.ogg',
		    5 : 'http://upload.wikimedia.org/wikipedia/commons/1/1c/Dtmf5.ogg',
		    6 : 'http://upload.wikimedia.org/wikipedia/commons/7/7b/Dtmf6.ogg',
		    7 : 'http://upload.wikimedia.org/wikipedia/commons/9/9f/Dtmf7.ogg',
		    8 : 'http://upload.wikimedia.org/wikipedia/commons/f/f7/Dtmf8.ogg',
		    9 : 'http://upload.wikimedia.org/wikipedia/commons/5/59/Dtmf9.ogg'
		},

		playTone : function(x) {
			var audio = new Audio(this.tones[x]);
			audio.play();
		},
	};
});