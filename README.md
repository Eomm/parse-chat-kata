# chat parser

This module parses chat strings to chat items:

```json
{
  "date": "14:24:32",
  "mention": "14:24:32 Customer : ",
  "sentence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "type": "customer"
}
```

## Installation

```
npm i parse-chat-kata
```

## Usage

```js
const { parseChat } = require('parse-chat-kata')

const chatTxt = `14:24:32 Customer : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
14:26:15 Agent : Aliquam non cursus erat, ut blandit lectus.`

console.log(parseChat(chatTxt))
```

### String format

The input string must be formatted as follow:

```
<hh:mm:ss> <mention_name [mention_surname]> : <sentence>\n
```

If the input string is not well formatted, an empty array will be returned.

### TODOs

- [ ] Support UNICODE Chars on names (for cool Nicknames 🤖)

## Contributing

To contribute to this project, or just to play with it locally, you need to execute:

```sh
git clone https://github.com/Eomm/parse-chat-kata.git
cd parse-chat-kata/
npm install

echo 'run test locally. they must be sucessfully to merge a PR'
npm test
```

## License

Licensed under [MIT](./LICENSE).
