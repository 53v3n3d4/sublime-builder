/**
 * Counter used by progress bar.
 * Count keys from json, theme rules or color-scheme globals/rules.
 */
export class Counter {
  /**
   * Get total lenght of object.
   * @returns {number}.
   */
  add = ((o) => {
    this.counter = 0
    return (o) => {
      this.counter += Object.keys(o).length
      return this.counter
    }
  })()

  reset () {
    this.counter = 0
  }

  /**
   * Get total length of nested object.
   * @returns {number}.
   */
  total (o) {
    Object.entries(o).forEach(([k, v]) => {
      if (v == null) {
        return null
      } else if (Object.hasOwn(o, 'extends')) {
        delete o[k]
      } else if (typeof v === 'object') {
        this.total(v)
      }
    })
    return this.add(o)
  }
}
