/**
 * Check if array includes an element, string.
 * @param {Array.<string>}.
 * @param {string}.
 * @returns {boolean}.
 */
export const arrayInclude = (a, s) => a.some(v => s.includes(v))
