"use strict";

var spawn = require('child_process').spawn;
var kill = require('tree-kill');
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
    } else {
        console.log("could not kill signal whose pid is not an integer");
    };
};


module.exports = Emitter;

