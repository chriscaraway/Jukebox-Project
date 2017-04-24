document.addEventListener('DOMContentLoaded', function() {

    var albumArtDiv = document.getElementById('album-art');

    // contructor function Jukebox object
    function Jukebox(songs, albums) {
        this.songList = songs; // bring in the array of song objects from outside
        this.albumCovers = albums; // bring in the array of album covers from outside
        this.index = 0; // setting up first (default) value of index
        this.currentAlbum = this.albumCovers[0]; // setting up first (default) value of album art
        this.currentSong = this.songList[0]; // setting up first (default) value of song
        this.prevFunc = function() {
            this.nextFunc(-1);
        };
        this.playFunc = function() {
            this.currentSong = this.songList[this.index];
            return this.currentSong.play();
        };
        this.pauseFunc = function() {
            return this.currentSong.pause();
        };
        this.stopFunc = function() {
            this.pauseFunc();
            // https://www.w3schools.com/tags/av_prop_currenttime.asp
            return this.currentSong.currentTime = 0; // currentTime is a built-in method
        };
        this.nextFunc = function() {
            this.stopFunc();
            this.index ++;
			if (this.index === this.songList.length) {
				this.index = 0;
			}
            return this.playFunc();
        };
        this.chooseSong = function(whichSong) {
            this.stopFunc();
            this.index = whichSong;
            return this.playFunc();
        };
    } // end constructor function Jukebox object


    // create variables and build an new instance of the Jukebox object
    var songOne = new Audio('noscrubs.mp3');
    var songTwo = new Audio('1985.mp3');
    var songThree = new Audio('heyya.mp3');
    var songArray = [songOne, songTwo, songThree];
    var albumArray = ['one.png', 'two.png', 'three.png'];

    var myJukebox = new Jukebox(songArray, albumArray);


    // event listeners for play, pause, stop, next
    var previousButton = document.getElementById('prevButt');
    var playButton = document.getElementById('playButt');
    var pauseButton = document.getElementById('pauseButt');
    var stopButton = document.getElementById('stopButt');
    var nextButton = document.getElementById('nextButt');

    previousButton.addEventListener('click', function() {
        myJukebox.prevFunc();
    });

    playButton.addEventListener('click', function() {
        myJukebox.playFunc();
    });

    pauseButton.addEventListener('click', function() {
        myJukebox.pauseFunc();
    });

    stopButton.addEventListener('click', function() {
        myJukebox.stopFunc();
    });

    nextButton.addEventListener('click', function() {
        myJukebox.nextFunc();
    });


    // event listeners for specific song choices
    var firstSong = document.getElementById('chooseFirstSong');
    var secondSong = document.getElementById('chooseSecondSong');
    var thirdSong = document.getElementById('chooseThirdSong');

    firstSong.addEventListener('click', function() {
        myJukebox.chooseSong(0);
    });

    secondSong.addEventListener('click', function() {
        myJukebox.chooseSong(1);
    });

    thirdSong.addEventListener('click', function() {
        myJukebox.chooseSong(2);
    });

}); // end DOMContentLoaded event listener
