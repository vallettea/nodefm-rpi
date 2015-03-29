## nodeFm

This is simple wrapper around [PiFm RDS](https://github.com/ChristopheJacquet/PiFmRds).

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

Install gpio admin and add suer `pi` to gpio group:

```
git clone git://github.com/quick2wire/quick2wire-gpio-admin.git
cd quick2wire-gpio-admin
make
sudo make install
sudo adduser pi gpio
```

### Usage

```
var fs = require('fs');

var radio = require('./index.js');

var emitter = new radio("89.5");
var radioStream = emitter.start();

fs.createReadStream('node_modules/PiFmRds/src/stereo_44100.wav').pipe(radioStream);


setTimeout(function(){
    emitter.stop();
}, 2000);

```
