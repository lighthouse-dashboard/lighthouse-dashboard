export default function bemMixin(bemRootSelector) {
    return {
        methods: {
            mapFacets(facets) {
                return facets.map(f => this.createFacet(f));
            },

            createFacet(facetName) {
                return `${ bemRootSelector }__${ facetName }`;
            },

            createIfFacet(equation, facetName) {
                if (equation) {
                    return `${ bemRootSelector }__${ facetName }`;
                }
                return null;
            },
        },
    };
};
