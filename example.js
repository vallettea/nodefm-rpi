"use strict";


var fsm = require('./fsm.js');

fsm.startBroadcast("node_modules/PiFmRds/src/sound.wav", "89.7");

setTimeout(function(){
    fsm.stopBroadcast();
}, 10000);