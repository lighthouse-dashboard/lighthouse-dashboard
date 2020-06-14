/**
 * get css var by name
 * @param {string} name
 * @return {string}
 */
const getCssVar = (name) => {
    return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
};

module.exports = getCssVar;

