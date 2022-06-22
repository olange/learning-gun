;(function(){
  const cluster = require('cluster');
  if( cluster.isMaster){
    return cluster.fork() && cluster.on( 'exit', function() { cluster.fork(); require('../lib/crashed'); });
  }

  const fs = require('fs');
  const config = {
    port: process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765,
    peers: process.env.PEERS && process.env.PEERS.split(',') || []
  };
  const Gun = require('gun');

  if( process.env.HTTPS_KEY) {
    config.key = fs.readFileSync(process.env.HTTPS_KEY);
    config.cert = fs.readFileSync(process.env.HTTPS_CERT);
    config.server = require('https').createServer(config, Gun.serve(__dirname));
  } else {
    config.server = require('http').createServer(Gun.serve(__dirname));
  }

  const gun = Gun({ web: config.server.listen(config.port), peers: config.peers });

  console.log( '\nRelay peer started on port ' + config.port + ' with /gun');
  console.log( 'HTTP server started on same port at /');

  module.exports = gun;
}());