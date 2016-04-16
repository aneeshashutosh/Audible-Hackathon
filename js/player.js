var audioCtx = new AudioContext;
    var url = '../mp3/book.m4a';
    var audio = new Audio(url);
    var processor = audioCtx.createScriptProcessor(2048, 1, 1);
    var meter = document.getElementById('meter');
    var source;
    audio.playbackRate = 1.0;
    audio.muted = false;
    audio.addEventListener('canplaythrough', function(){
      source = audioCtx.createMediaElementSource(audio);
      source.connect(processor);
      source.connect(audioCtx.destination);
      processor.connect(audioCtx.destination);
      audio.play();
    }, false);
    // loop through PCM data and calculate average
    // volume for a given 2048 sample buffer
    processor.onaudioprocess = function(evt){
      var input = evt.inputBuffer.getChannelData(0)
        , len = input.length
        , total = i = 0
        , rms;
      while ( i < len ) total += Math.abs( input[i++] );
      rms = Math.sqrt( total / len );
      console.log(( rms * 100 ));
    };
