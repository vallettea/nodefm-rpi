"use strict";

var fs = require('fs');

var radio = require('./index.js');

var emitter = new radio("88.7");
var radioStream = emitter.start();

var stream = fs.createReadStream('node_modules/PiFmRds/src/stereo_44100.wav')
stream.pipe(radioStream);


setTimeout(function(){
    stream.unpipe(radioStream);
    emitter.stop();
}, 5000);