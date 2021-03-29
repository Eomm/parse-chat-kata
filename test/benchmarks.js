'use strict'

const bench = require('fastbench')
const { parseChat } = require('../lib/parser')

const txt = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`

const run = bench([
  function benchSimpleChat (done) {
    parseChat(txt)
    process.nextTick(done)
  }
], 10000)

// run them two times
run(run)
