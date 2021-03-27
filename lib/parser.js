'use strict'

module.exports = parseChat

/**
 * Parse chat string sentences
 * @param {String} txt
 * @returns {ChatItem[]} chat items
 */
function parseChat (txt) {
  if (!txt) {
    return []
  }

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

/**
 * Chat item
 * @typedef {Object} ChatItem
 * @property {string} date - Date of the message in hh:mm:ss format
 * @property {string} mention - The writer of the message
 * @property {string} sentence - The message text with end line if any
 * @property {string} type - Enum "customer" or "agent"
 */
