"use strict";


var emitter = require('./index.js');

emitter.startBroadcast("Radio_Tondu_2.wav", "89.7");

setTimeout(function(){
    emitter.stopBroadcast();
}, 5000);

 
