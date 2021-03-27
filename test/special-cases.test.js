'use strict'

const { test } = require('tap')

const parseChat = require('../lib/parser')

test('empty string', t => {
  t.plan(1)
  const parsed = parseChat('')
  t.deepEqual(parsed, [])
})

test('null input', t => {
  t.plan(1)
  const parsed = parseChat(null)
  t.deepEqual(parsed, [])
})

test('name surname', t => {
  t.plan(1)
  const txt = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent Fortyseven : Aliquam non cursus erat, ut blandit lectus.`
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent Fortyseven : ',
    sentence: 'Aliquam non cursus erat, ut blandit lectus.',
    type: 'agent'
  }])
})

test('name nickname', t => {
  t.plan(1)
  const txt = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent 47 : Aliquam non cursus erat, ut blandit lectus.`
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent 47 : ',
    sentence: 'Aliquam non cursus erat, ut blandit lectus.',
    type: 'agent'
  }])
})

test('name surname missing colon', t => {
  t.plan(1)
  const txt = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent Surname Aliquam non cursus erat, ut blandit lectus.`
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent ',
    sentence: 'Surname Aliquam non cursus erat, ut blandit lectus.',
    type: 'agent'
  }])
})
