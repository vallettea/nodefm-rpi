"use strict";

var fs = require('fs');

var radio = require('./index.js');

var emitter = new radio("89.5");
var radioStream = emitter.start();

fs.createReadStream('node_modules/PiFmRds/src/stereo_44100.wav').pipe(radioStream);


setTimeout(function(){
    emitter.stop();
}, 500);

