function generateNodeModulesRegex({ mustInclude }, list) {
    const modifier = mustInclude ? '' : '?!';
    const concatenatedList = `${ list.join('/|') }/`;

    if (Array.isArray(list) && list.length) {
        // Generate a regex that will match also these modules
        return new RegExp(`/node_modules/(${ modifier }${ concatenatedList })`);
    }

    throw Error('Please provide a list of node_modules');
};

exports.matchNodeModules = list => generateNodeModulesRegex({ mustInclude: true }, list);
