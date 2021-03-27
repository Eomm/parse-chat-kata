'use strict'

module.exports = parseChat

/**
 *
 * @param {String} txt
 * @param {*} opts
 * @returns {Array<Object>} chat items
 */
function parseChat (txt, opts = {}) {
  let customerName

  const chatItemRegexp = /(\d{2}:\d{2}:\d{2}) (\w*( ?\w{0,}(?= :))? ?:? ?)(.*\s?)/gm
  const dateOnNewLines = /(?<=.+)(?=\d{2}:\d{2}:\d{2} [\w ]*:? ?)/g

  const normalized = txt.replace(dateOnNewLines, '\r')

  return Array.from(normalized.matchAll(chatItemRegexp), toChatItem.bind(null, getWriterType))

  function getWriterType (writer, index) {
    if (index === 0) {
      customerName = writer
    }

    return writer === customerName ? 'customer' : 'agent'
  }
}

function toChatItem (parseType, lineMatch, lineIndex) {
  const [, date, writer, , sentence] = lineMatch

  return {
    date,
    mention: `${date} ${writer}`,
    sentence: sentence.replace(/\r$/, ''),
    type: parseType(writer, lineIndex)
  }
}
