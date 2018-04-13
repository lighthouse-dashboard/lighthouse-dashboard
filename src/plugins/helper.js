/**
 * Extract all endpoints
 * @param builds
 */
function collectReportEndpoints(builds) {
    const urls = {};
    for (let b = 0; b < builds.length; b++) {
        const { artifactContent } = builds[b];

        for (let a = 0; a < artifactContent.length; a++) {
            const artifact = artifactContent[a];
            artifact.tag = artifact.tag || 'untagged';
            artifact.key = `${artifact.tag}:${artifact.url}`;

            if (!urls[artifact.key]) {
                urls[artifact.key] = {
                    scores: {},
                    builds: []
                };
            }
        }
    }
    return urls;
}

/**
 * Extract all categories
 * @param builds
 */
function collectReportCategories(builds) {
    const endpoints = collectReportEndpoints(builds);

    for (let b = 0; b < builds.length; b++) {
        const { artifactContent, build_num } = builds[b];


        for (let a = 0; a < artifactContent.length; a++) {
            const artifact = artifactContent[a];
            artifact.key = artifact.key || artifact.tag;

            const { categories, key } = artifact;
            endpoints[key].builds.push('#' + build_num);


            const simplifiedCategory = simplifyCategoryScores(categories);
            addSimplifiedCategoryToResults(endpoints, key, simplifiedCategory);
        }
    }

    return endpoints;
}

/**
 * Add results to endpoints
 * @param endpoints
 * @param url
 * @param categories
 */
function addSimplifiedCategoryToResults(endpoints, url, categories) {
    const keys = Object.keys(categories);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const score = categories[key];
        if (!endpoints[url].scores[key]) {
            endpoints[url].scores[key] = [];
        }

        endpoints[url].scores[key].push(score);
    }
}

/**
 * Simplify the category structure
 * @param categories
 */
function simplifyCategoryScores(categories) {
    let data = {};
    for (let i = 0; i < categories.length; i++) {
        const { name, score } = categories[i];
        data[name] = score;
    }
    return data;
}

/**
 * Prepare data for chart
 *
 * - URL1
 *  - scores
 *      - Performance: []
 *      - SEO: []
 *      - ...: []
 *
 *  - builds: []
 * - URL2
 *  - ...
 *
 * @param {Array} builds
 */
export default function sortBuildArtifactsByUrl(builds) {
    const data = collectReportCategories(builds);
    return data;
}
