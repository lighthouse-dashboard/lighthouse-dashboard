import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

const getComponentNameFromFileName = (fileName) => upperFirst(
    camelCase(fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, ''))
);

function loadComponentsByPattern(Vue, context, component) {
    component.keys().forEach(fileName => {
        // Get component config
        const componentConfig = component(fileName);

        // Get PascalCase name of component
        const componentName = getComponentNameFromFileName(fileName);

        // Register component globally
        Vue.component(
            componentName,
            // Look for the component options on `.default`, which will
            // exist if the component was exported with `export default`,
            // otherwise fall back to module's root.
            { ...(componentConfig.default || componentConfig), ...context }
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

const loaders = [
    require.context(
        // The relative path of the components folder
        '../app/components',
        // Whether or not to look in subfolders
        true,
        // The regular expression used to match base component filenames
        /[a-zA-Z0-9-]+\.vue$/
    ),
    require.context(
        // The relative path of the components folder
        '../app/providers',
        // Whether or not to look in subfolders
        true,
        // The regular expression used to match base component filenames
        /[a-zA-Z0-9-]+\.vue$/
    ),
    require.context(
        // The relative path of the components folder
        '../app/container',
        // Whether or not to look in subfolders
        true,
        // The regular expression used to match base component filenames
        /[a-zA-Z0-9-]+\.vue$/
    ),
];

export default function registry(Vue, context) {
    loadFilters(Vue);
    loaders.map((c) => loadComponentsByPattern(Vue, context, c));
};
