'use strict'

const fs = require('fs'),
      path = require('path'),
      selfsigned = require('selfsigned');

const attrs = [ { name: 'commonName', value: 'localhost' },
                { name: 'subjectAltName', value: '0.0.0.0' } ];

const pems = selfsigned.generate( attrs, { days: 365 });
console.log( pems);

fs.writeFileSync( path.join( __dirname, 'selfsigned.key.pem'), pems.private);
fs.writeFileSync( path.join( __dirname, 'selfsigned.cert.pem'), pems.cert);