const fs = require('fs');
const Gun = require('gun');

const config = {
  port: process.env.PORT || process.argv[2] || 8765,
  peers: process.env.PEERS && process.env.PEERS.split(',') || []
};

const gun = Gun({
  web: require('http').createServer().listen( config.port),
  peers: config.peers
});

console.log( `\nGUN relay peer started on port ${config.port} at /gun`
           + `\nwith peers [${config.peers.join(', ')}]`);

module.exports = gun;