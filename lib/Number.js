/**
 * Clamp a value between a minimum and maximum value
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (value, min, max) => {
    if (value < min) return min
    if (value > max) return max
    return value
}
