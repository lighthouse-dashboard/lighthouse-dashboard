// eslint-disable-next-line global-require
const getTheme = () => require(`../../../../../themes/light.js`);

let theme = null;
module.exports = function() {
    if (!theme) {
        const mod = getTheme();
        theme = mod.default;
    }

    return theme;
};
