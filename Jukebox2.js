/* globals $, SC */

document.addEventListener('DOMContentLoaded', function() {

    var albumArtDiv = document.getElementById('album-art');

    //Soundcloud API

    SC.initialize({ client_id: "fd4e76fc67798bfa742089ed619084a6" });


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

        this.uploadFunc = function () {
          var files = this.dom.upload.prop("files");
          console.log(files);

          for (var i = 0; i < files.length; i ++) {
            var file = URL.createOjectURL(files[i]);
            this.addSong(file, {
              title: "Uploaded song",
              artist: "Unknown",
            });

          }

        };




    }


    // Song Album Array
    var songOne = new Audio('noscrubs.mp3');
    var songTwo = new Audio('1985.mp3');
    var songThree = new Audio('heyya.mp3');
    var songArray = [songOne, songTwo, songThree];
    var albumArray = ['one.png', 'two.png', 'three.png'];

    var myJukebox = new Jukebox(songArray, albumArray);

    var Soundcloud = new Audio("https://soundcloud.com/tlcofficial/unpretty", {
      title: "Unpretty",
      artist: "TLC",
    });
    this.change(this.songs[0]);


    // event listeners for play, pause, stop, next
    var previousButton = document.getElementById('prevButt');
    var playButton = document.getElementById('playButt');
    var pauseButton = document.getElementById('pauseButt');
    var stopButton = document.getElementById('stopButt');
    var nextButton = document.getElementById('nextButt');
    var uploadButton = document.getElementById('jukebox-header-upload');

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

    // 1 bind to input, 2 find an event for selecting file
    uploadButton.addEventListener('change', function() {
        myJukebox.uploadFunc();
    });

    // Upload Song on Jukebox
    this.dom.upload.on ("change", function() {
      var files = this.dom.upload.prop("files");
      console.log(files);

      for(var i = 0; i < files.length; i++) {
        var file = URL.createOjectURL(files[i]);
        this.addSong(file, {
          title: "Uploaded song",
          artist: "Unknown",
        });
      }
    }.bind(this));

    this.dom.add.on("click", function() {
      var url = this.dom.input.val();
      console.log("SoundCloud is playing!");
      this.addSong(url);
    }.bind(this));

    }); // end DOMContentLoaded event listener
