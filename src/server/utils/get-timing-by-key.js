/**
 *
 * @param {Timing[]} timings
 * @param {string} key
 * @return {Timing}
 */
export default function getTimingByKey(timings, key) {
    return timings.find(t => t.id === key);
}

/**
 *
 * @param {Timing[]} timings
 * @param {string} key
 * @return {number}
 */
export function getTimingValueByKey(timings, key) {
    const timing = getTimingByKey(timings, key);
    if (!timing) {
        return null;
    }
    return timing.timing;
}
