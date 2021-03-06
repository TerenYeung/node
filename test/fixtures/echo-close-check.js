const common = require('../common');
const assert = require('assert');
const net = require('net');
const fs = require('fs');

process.stdout.write('hello world\r\n');

var stdin = process.openStdin();

stdin.on('data', function(data) {
  process.stdout.write(data.toString());
});

stdin.on('end', function() {
  // If stdin's fd was closed, the next open() call would return 0.
  var fd = fs.openSync(process.argv[1], 'r');
  assert(fd > 2);
  fs.closeSync(fd);
});
