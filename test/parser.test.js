'use strict'

const { test } = require('tap')

const parseChat = require('../lib/parser')

test('single sentence', t => {
  t.plan(1)
  const parsed = parseChat('14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }])
})

test('two sentences', t => {
  t.plan(1)
  const txt = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'Aliquam non cursus erat, ut blandit lectus.',
    type: 'agent'
  }])
})

test('full chat', t => {
  t.plan(1)
  const txt = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.
14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.
14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.`
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'Aliquam non cursus erat, ut blandit lectus.\n',
    type: 'agent'
  }, {
    date: '14:27:00',
    mention: '14:27:00 Customer : ',
    sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n',
    type: 'customer'
  }, {
    date: '14:27:47',
    mention: '14:27:47 Agent : ',
    sentence: 'Vestibulum tempor diam eu leo molestie eleifend.',
    type: 'agent'
  }])
})

test('two customer mentions as start', t => {
  t.plan(1)
  const txt = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:27:00 Customer : Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.
14:27:47 Agent : Vestibulum tempor diam eu leo molestie eleifend.`
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n',
    type: 'customer'
  }, {
    date: '14:27:00',
    mention: '14:27:00 Customer : ',
    sentence: 'Pellentesque cursus maximus felis, pharetra porta purus aliquet viverra.\n',
    type: 'customer'
  }, {
    date: '14:27:47',
    mention: '14:27:47 Agent : ',
    sentence: 'Vestibulum tempor diam eu leo molestie eleifend.',
    type: 'agent'
  }])
})

test('date splitting', t => {
  t.plan(1)
  const txt = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.'
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'Aliquam non cursus erat, ut blandit lectus.',
    type: 'agent'
  }])
})

test('date splitting', t => {
  t.plan(1)
  const txt = '14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent : I received it at 12:24:48, ut blandit lectus.'
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer : ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent : ',
    sentence: 'I received it at 12:24:48, ut blandit lectus.',
    type: 'agent'
  }])
})

test('missing colon after the names', t => {
  t.plan(1)
  const txt = '14:24:32 Customer Lorem ipsum dolor sit amet, consectetur adipiscing elit.14:26:15 Agent I received it at 12:24:48, ut blandit lectus.'
  const parsed = parseChat(txt)
  t.deepEqual(parsed, [{
    date: '14:24:32',
    mention: '14:24:32 Customer ',
    sentence: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type: 'customer'
  }, {
    date: '14:26:15',
    mention: '14:26:15 Agent ',
    sentence: 'I received it at 12:24:48, ut blandit lectus.',
    type: 'agent'
  }])
})
