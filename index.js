"use strict";

var spawn = require('child_process').spawn;
var kill = require('tree-kill');
var gpio = require('rpi-gpio');
var path = require('path');

var method = Emitter.prototype;


function Emitter(freq) {

    this.freq = freq;
    this.pid = null;

}

method.start = function() {
    var cPath = path.join(__dirname, "node_modules" ,"PiFmRds", "src", "pi_fm_rds");
    var myProcess = spawn(
        cPath,
        ["-freq", this.freq, "-audio", "-"],
        { stdio: ['pipe', 1, 2, 'ipc'] }
    );
    console.log("Broadcasting, process :", myProcess.pid);
    this.pid = myProcess.pid;
    return myProcess.stdin;
};

method.stop = function() {
    if (this.pid > 0){
        kill(this.pid, 'SIGINT');
        this.cleanGpio(7);
    } else {
        console.log("could not kill signal whose pid is not an integer");
        this.cleanGpio(7);
    };
};


method.cleanGpio = function(number) {
    try {
        gpio.setup(7, gpio.DIR_OUT);
        gpio.destroy(function() {
            console.log("Pin 7 unexported");
        });
    } catch(err) {
        console.log(err);
    }
};


module.exports = Emitter;

