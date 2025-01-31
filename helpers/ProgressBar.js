import { color } from './messageColor.js'

/**
 * Progress bar
 * @see https://medium.com/@bargord11/
 *      write-your-first-node-js-terminal-progress-bar-5bd5edb8a563
 * @see https://github.com/visionmedia/node-progress/
 */
export class ProgressBar {
  constructor () {
    this.width = process.stdout.columns - 33
  }

  start (total) {
    this.total = typeof total === 'number'
      ? total
      : console.log(color('Should be a number.', 'red'))
    this.current = 0
  }

  update (current) {
    this.current = typeof current === 'number'
      ? current
      : console.log(color('Should be an number.', 'red'))
    let progress = this.current / this.total
    progress = Math.min(Math.max(progress, 0), 1)
    this.draw(progress)
  }

  draw (progress) {
    const completeLength = Math.round(progress * this.width)
    const length = this.width - completeLength

    const complete = this.bar((Math.max(0, completeLength + 1)), '=')
    const incomplete = this.bar(length, '-')
    const percentage = Math.floor(progress * 100)

    if (process.stdout.isTTY) {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(
        `Building: [${complete}${incomplete}] | ${percentage}%`
      )
    } else {
      // GitHub workflow CI Js Tests
      process.stdout.write(
        `Building: [${complete}${incomplete}] | ${percentage}%`
      )
    }
    if (percentage === 100) {
      console.log('\n' + color('Building done.', 'gray'))
    }
  }

  bar (length, char) {
    let str = ''
    for (let i = 0; i < length; i++) {
      str += char
    }
    return str
  }
}
