/**
 * Returns shared items betweens the arguments.
 * Only work on primitive types.
 *
 * @param {array} a
 * @param {array} b
 */
export const arrayIntersection = (a = [], b = []) => {
  const bSet = new Set(b)
  return a.filter(x => bSet.has(x))
}

/**
 * Returns a number as a string with thousand separator.
 *
 * @param {number|string} number
 * @param {string} separator
 */
export const numberWithSeparator = (number, separator = ' ') => {
  if (typeof number !== 'number' && typeof number !== 'string') {
    return number
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
}
