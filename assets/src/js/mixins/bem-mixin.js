export default function bemMixin(bemRootSelector) {
    return {
        methods: {
            createFacet(facetName) {
                return `${ bemRootSelector }__${ facetName }`;
            },

            createIfFacet(equation, facetName) {
                if (equation) {
                    return `${ bemRootSelector }__${ facetName }`;
                }
                return null;
            }
        }
    }
};
