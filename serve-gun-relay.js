const fs = require('fs'),
      path = require('path'),
      Gun = require('gun');

const config = {
  port: process.env.PORT || process.argv[2] || 8765,
  peers: process.env.PEERS && process.env.PEERS.split(',') || [],
  selfSignedCert: {
    key: fs.readFileSync( path.join( __dirname, 'config/selfsigned.key.pem')),
    cert: fs.readFileSync( path.join( __dirname, 'config/selfsigned.cert.pem'))
  }
};

console.log(config);

const gun = Gun({
  web: require('https').createServer( config.selfSignedCert).listen( config.port),
  peers: config.peers
});

console.log( `\nGUN WSS relay peer started on port ${config.port} at /gun`
           + `\nwith peers [${config.peers.join(', ')}]`);

module.exports = gun;