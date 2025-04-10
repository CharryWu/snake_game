/**
 * Random number generator based on [min, max)
 * @param {number} min
 * @param {number} max
 * @returns {number} a random integer between min (inclusive) and max (exclusive)
 */
export function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
