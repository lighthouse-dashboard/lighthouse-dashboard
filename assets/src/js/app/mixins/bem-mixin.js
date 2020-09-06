export default function bemMixin(bemRootSelector) {
    return {
        props: {
            facets: {
                type: Array,
                default: () => [],
            },
            facet: {
                type: String,
                default: null,
            },
        },

        computed: {
            rootFacets() {
                return this.mapFacets([this.facet, ...this.facets]);
            },
        },

        methods: {
            mapFacets(facets) {
                return facets.filter(f => !!f).map(f => this.createFacet(f));
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
