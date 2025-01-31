const messageWrongColor =
  'Use one of these color options: cyan, gray, purple, red or yellow.'

export const color = (text, tint) => {
  switch (tint) {
    case 'cyan':
      return (tint = `\u001B[36m${text}\u001b[0m`)
    case 'gray':
      return (tint = `\u001B[90m${text}\u001b[0m`)
    case 'purple':
      return (tint = `\u001B[35m${text}\u001b[0m`)
    case 'red':
      return (tint = `\u001B[91m${text}\u001b[0m`)
    case 'yellow':
      return (tint = `\u001B[93m${text}\u001b[0m`)
    default:
      console.log('\u001B[91m' + messageWrongColor + '\u001b[0m')
      return messageWrongColor
  }
}
