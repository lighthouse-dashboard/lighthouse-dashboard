import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

const getComponentNameFromFileName = (fileName) => upperFirst(
    camelCase(fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''))
);

function loadComponents(Vue) {
    const requireComponent = require.context(
        // The relative path of the components folder
        '../app/components',
        // Whether or not to look in subfolders
        true,
        // The regular expression used to match base component filenames
        /[a-zA-Z0-9-]+\.vue$/
    );

    requireComponent.keys().forEach(fileName => {
        // Get component config
        const componentConfig = requireComponent(fileName);

        // Get PascalCase name of component
        const componentName = getComponentNameFromFileName(fileName);

        // Register component globally
        Vue.component(
            componentName,
            // Look for the component options on `.default`, which will
            // exist if the component was exported with `export default`,
            // otherwise fall back to module's root.
            componentConfig.default || componentConfig
        );
    });
}
function loadFilters(Vue) {
    const requireComponent = require.context(
        // The relative path of the components folder
        '../app/filters',
        // Whether or not to look in subfolders
        true,
        // The regular expression used to match base component filenames
        /[a-zA-Z0-9-]+\.js$/
    );

    requireComponent.keys().forEach(fileName => {
        // Get component config
        const componentConfig = requireComponent(fileName);

        // Get PascalCase name of component
        const componentName = getComponentNameFromFileName(fileName);

        // Register component globally
        Vue.filter(
            componentName,
            // Look for the component options on `.default`, which will
            // exist if the component was exported with `export default`,
            // otherwise fall back to module's root.
            componentConfig.default || componentConfig
        );
    });
}

export default function registry(Vue) {
    loadFilters(Vue);
    loadComponents(Vue);
};
