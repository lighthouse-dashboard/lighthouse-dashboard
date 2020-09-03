const path = require('path');

module.exports = {
    stories: ['../assets/src/js/**/*.story.js'],
    addons: [
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/\.story\.js?$/]
                },
                loaderOptions: {
                    prettierConfig: { printWidth: 80, singleQuote: true },
                },
            },
        },
    ],
};
