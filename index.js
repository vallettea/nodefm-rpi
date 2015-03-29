"use strict";

var machina = require('machina');
var spawn = require('child_process').spawn;
var kill = require('tree-kill');
var Promise = require('es6-promise').Promise;
var gpio = require('rpi-gpio');

function write() {
    gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Liberating the carrier.');
    });
}

var fsm = new machina.Fsm({

    pifmPid: null,

    startBroadcast: function(waveFile, freq) {

        var self = this;

        return new Promise(function(resolve, reject){

            if (self.state !== "broadcasting") {

                new Promise(function(resolve, reject){
                    var myProcess = spawn(
                        "node_modules/PiFmRds/src/pi_fm_rds", 
                        ["-audio", waveFile, "-freq", freq]
                    );
                    console.log("nodeprocess :", myProcess.pid, "myProcess: ", process.pid);

                    myProcess.stdout.on("data", function(chunkBuffer){
                        var message = chunkBuffer.toString();
                        console.log(" out:data => " + message);
                        resolve(myProcess.pid);
                    });

                    resolve(myProcess.pid);             
                })
                .then(function(pid){
                    self.pifmPid = pid;
                    self.transition( "broadcasting" );
                    resolve("SUCCESS");
                })
                .catch(function(err){
                    console.log(err.msg);
                    console.log("Could not broadcast. Cleanning...");
                    self.cleanConnexion(err.pid)
                    reject("FAILURE " + err.msg);
                });

            } else {
                console.log("Already broadcasting.")
                resolve("SUCCESS");
            }
        });
        
    },

    stopBroadcast: function(pid){

        var self = this;

        return new Promise(function(resolve, reject){
            pid = pid || self.pifmPid;
            console.log("Cleaning pid ", pid);
            if (pid > 0){
                kill(pid, 'SIGKILL');
                gpio.setup(7, gpio.DIR_OUT, write);
                self.transition( "stopped" );
                resolve("SUCCESS");
            } else {
                console.log("could not kill signal whose pid is not an integer");
                reject("FAILURE");
            };
        }).then(function(result){
            console.log(result);
        });
    },


    initialState: "stopped",

    states : {
        "broadcasting" : {
            _onEnter: function() {
                this.handle("tell.broadcasting");
            },

            "tell.broadcasting" : function( payload ) {
                console.log("BROADCASTING, pid: " + this.pifmPid)
            }
        },

        "stopped" : {
            "tell.stopped" : function( payload ) {
                console.log("stopped")
            }
        }
    }
});



module.exports = fsm