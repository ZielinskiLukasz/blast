// Make our playlist items drag/droppable
$(function() {
		$( ".sortable" ).sortable();
		$( ".sortable" ).disableSelection();
});

// Setup keyboard shortcuts
keyPressDebug = false;
jQuery(function($){
    $('body').keypress(function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        // debug actions
        //$('div#notifications').html(code);
        if (keyPressDebug) { $.sticky('keycode: ' + code); }
        // ref: http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
        if (code == 63) {                               // ? (toggle help)
            $('#helpmodal').modal('toggle');
        } else if (code == 13)  {                       // enter (select track)
            $.sticky('enter')
        } else if (code ==  99) {                       // c (toggle pause)
            soundManager.togglePause(pagePlayer.lastSound.id);
            $.sticky('toggling pause');
        } else if (code == 100) {                       // d (toggle debug)
            keyPressDebug = keyPressDebug ? false : true;
            $.sticky('debug:'+keyPressDebug);
        } else if (code == 109) {                       // m (toggle mute)
            $.sticky('toggling mute');
            soundManager.toggleMute(pagePlayer.lastSound.id);
        } else if (code == 114) {                       // r (randomize list)
            soundManager.stopAll();
            $.sticky('randomizing!');
            $('ul').shuffle();
        } else if (code == 115) {                       // s (toggle shuffle)
            if (pagePlayer.shuffle == true) { pagePlayer.shuffle = false; }
            else                            { pagePlayer.shuffle = true; }
            $.sticky('shuffle: '+pagePlayer.shuffle);
        } else if (code == 110 ||                      // n  (next track)
                   code == 106 || code == 98) {        // j, b 
            $.sticky('play next track');
            pagePlayer.playNext();
        } else if (code == 107 || code == 122) {       // k, z (prev track)
            $.sticky('play prev track');
            if (!pagePlayer.shuffle) { pagePlayer.playPrevious(); }
        } else if (code == 120) {                       // x (stop)
            $.sticky('stop');
            soundManager.stopAll();
            // Reset position to 0
            if (pagePlayer.lastSound) { soundManager.setPosition(pagePlayer.lastSound.id, 0); }
        } else if (code == 118) {                       // v (play)
            $.sticky('play');
            if (pagePlayer.lastSound) {
                pagePlayer.lastSound.play();
            } else {
                pagePlayer.startPlay();
            }
        } else if (code ==  48) {                       // 0 (reset trackhead to 0)
            $.sticky('reset');
            if (pagePlayer.lastSound) { soundManager.setPosition(pagePlayer.lastSound.id, 0); }
        } else if (code == 44 ||                        // , 
                   code == 91 || code == 123) {         // [, { (skip behind)
            var pos = pagePlayer.lastSound.position;
            //$.sticky(pos);
            if (code == 44)         { pos -= 1000;      // jump behind 1  seconds for ,
            } else if (code == 123) { pos -= 5000;      // jump behind 5  seconds for {
            } else                  { pos -= 30000; }   // jump behind 30 seconds for [
            if (pos < 0) { pos = 0; }
            $.sticky('rewind: '+((pos-pagePlayer.lastSound.position)/1000)+'s');
            soundManager.setPosition(pagePlayer.lastSound.id, pos);
        } else if (code == 46 ||                        // .
                   code == 93 || code == 125) {         // ], } (skip ahead)
            var pos = pagePlayer.lastSound.position;
            if (code == 46)         { pos += 1000;      // jump ahead 1  seconds for .
            } else if (code == 125) { pos += 5000;      // jump ahead 5  seconds for }
            } else                  { pos += 30000; }   // jump ahead 30 seconds for ]
            if (pagePlayer.lastSound.loaded == false) {
                if (pos > pagePlayer.lastSound.durationEstimate) { pos = pagePlayer.lastSound.durationEstimate; }
            } else {
                if (pos > pagePlayer.lastSound.duration)         { pos = pagePlayer.lastSound.duration; }
            }
            $.sticky('skip: +'+((pos-pagePlayer.lastSound.position)/1000)+'s');
            soundManager.setPosition(pagePlayer.lastSound.id, pos);
        }
    });
});
