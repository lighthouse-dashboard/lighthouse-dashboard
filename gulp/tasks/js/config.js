// NOTE: Check for `@cc_on` (IE conditional comments) as these comments are used to distinct between IE versions
const preserveCommentRE = /(^@cc_on.*@)/i;

// NOTE: Extract licence and important comments for legal reasons
const extractCommentRE = /(?:^!|@(?:license|preserve))/i;

module.exports = {
    minify: {
        extractComments: {
            condition: extractCommentRE,
        },
        sourceMap: true,
        terserOptions: {
            output: {
                comments: preserveCommentRE,
            },
        },
    }
}
