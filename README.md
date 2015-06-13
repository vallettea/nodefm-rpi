## nodefm-rpi

This is simple wrapper around [PiFm RDS](https://github.com/Hatagashira/PiFmRds).

### Install

Install node:

```
wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb
```

Install libsnd:

``` 
sudo apt-get install libsndfile1-dev
```

then you can use:

```
npm install nodefm-rpi
```

### Usage

```
var fs = require('fs');

var radio = require('nodefm-rpi');

var emitter = new radio("89.5");
var radioStream = emitter.start();

fs.createReadStream('node_modules/PiFmRds/src/stereo_44100.wav').pipe(radioStream);


setTimeout(function(){
    emitter.stop();
}, 2000);

```

## Disclaimer

Never use this program to transmit VHF-FM data through an antenna, as it is illegal in most countries. This code is for experimental purposes only. Always connect a shielded transmission line from the RaspberryPi directly to a radio receiver, so as not to emit radio waves.

I could not be held liable for any misuse of your own Raspberry Pi. Any experiment is made under your own responsibility.
