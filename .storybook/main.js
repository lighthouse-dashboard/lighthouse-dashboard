const path = require('path');

module.exports = {
    stories: ['../assets/src/js/**/*.story.js'],
    addons: [
        {
            name: '@storybook/addon-storysource',
            options: {
                include: [path.resolve(__dirname, '../assets/src/js/app')],
                loaderOptions: {
                    parser: 'javascript',
                    prettierConfig: {
                        printWidth: 100,
                        tabWidth: 4
                    }
                }
            }
        },
    ]
};
