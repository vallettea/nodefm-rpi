"use strict";

var spawn = require('child_process').spawn;
var kill = require('tree-kill');
var gpio = require("pi-gpio");

var method = Emitter.prototype;


function Emitter(freq) {

    this.freq = freq;
    this.pid = null;
 
}

method.start = function() {
    var myProcess = spawn(
        "node_modules/PiFmRds/src/pi_fm_rds", 
        ["-freq", this.freq, "-audio", "-"],
        { stdio: ['pipe', 1, 2, 'ipc'] }
    );
    console.log("Broadcasting, process :", myProcess.pid);
    this.pid = myProcess.pid;
    return myProcess.stdin;
};

method.stop = function() {
    if (this.pid > 0){
        kill(this.pid, 'SIGKILL');
        this.cleanGpio(7);
 

    } else {
        console.log("could not kill signal whose pid is not an integer");
        this.cleanGpio(7);
    };
};

method.cleanGpio = function(number) {
    gpio.open(number, "output", function(err) {     // Open pin number for output 
        gpio.write(number, 0, function() {          // Set pin number high (1) 
            gpio.close(number);                     // Close pin 16 
        });
    });
};


module.exports = Emitter;

