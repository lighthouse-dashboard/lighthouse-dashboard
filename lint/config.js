module.exports = {
    rules: {
        // Specify a blacklist of disallowed at-rules.
        //"at-rule-blacklist": null,

        // Require or disallow an empty line before at-rules.
        'at-rule-empty-line-before': ['always', {
            except: ['first-nested'],
            ignore: ['after-comment', 'blockless-after-blockless'],
            ignoreAtRules: ['content', 'else', 'return'],
            severity: 'error',
        }],

        // Specify lowercase or uppercase for at-rules names.
        'at-rule-name-case': ['lower', { severity: 'error' }],

        // Require a newline after at-rule names.
        //"at-rule-name-newline-after": null,

        // Require a single space after at-rule names.
        'at-rule-name-space-after': ['always', { severity: 'warning' }],

        // Disallow unknown at-rules.
        //"at-rule-no-unknown": null,

        // Disallow vendor prefixes for at-rules.
        'at-rule-no-vendor-prefix': [true, { severity: 'error' }],

        // Require a newline after the semicolon of at-rules.
        'at-rule-semicolon-newline-after': ['always', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the semicolons of at rules.
        'at-rule-semicolon-space-before': ['never', { severity: 'warning' }],

        // Specify a whitelist of allowed at-rules.
        //"at-rule-whitelist": null,

        // Require or disallow an empty line before the closing brace of blocks.
        'block-closing-brace-empty-line-before': ['never', { severity: 'warning' }],

        // Require a newline or disallow whitespace after the closing brace of blocks.
        'block-closing-brace-newline-after': ['always', {
            ignoreAtRules: ['if', 'else'],
            severity: 'warning',
        }],

        // Require a newline or disallow whitespace before the closing brace of blocks.
        'block-closing-brace-newline-before': ['always-multi-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace after the closing brace of blocks.
        //"block-closing-brace-space-after": null,

        // Require a single space or disallow whitespace before the closing brace of blocks.
        'block-closing-brace-space-before': ['always-single-line', { severity: 'warning' }],

        // Disallow empty blocks.
        'block-no-empty': [true, { severity: 'warning' }],

        // Require a newline after the opening brace of blocks.
        'block-opening-brace-newline-after': ['always-multi-line', { severity: 'warning' }],

        // Require a newline or disallow whitespace before the opening brace of blocks.
        //"block-opening-brace-newline-before": null,

        // Require a single space or disallow whitespace after the opening brace of blocks.
        'block-opening-brace-space-after': ['always-single-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the opening brace of blocks.
        'block-opening-brace-space-before': ['always', { severity: 'warning' }],

        // Specify lowercase or uppercase for hex colors.
        'color-hex-case': ['lower', { severity: 'warning' }],

        // Specify short or long notation for hex colors.
        'color-hex-length': ['long', { severity: 'warning' }],

        // Require (where possible) or disallow named colors.
        'color-named': ['never', { severity: 'warning' }],

        // Disallow hex colors.
        //"color-no-hex": null,

        // Disallow invalid hex colors.
        'color-no-invalid-hex': [true, { severity: 'error' }],

        // Require or disallow an empty line before comments.
        //"comment-empty-line-before": null,

        // Disallow empty comments.
        'comment-no-empty': [true, { severity: 'warning' }],

        // Require a single space or disallow whitespace on the inside of comment markers.
        'comment-whitespace-inside': ['always', { severity: 'warning' }],

        // Specify a blacklist of disallowed words within comments.
        //"comment-word-blacklist": null,

        // Specify pattern of custom media query names.
        //"custom-media-pattern": null,

        // Require or disallow an empty line before custom properties.
        //"custom-property-empty-line-before": null,

        // Specify pattern of custom properties.
        //"custom-property-pattern": null,

        // Require a single space or disallow whitespace after the bang of declarations.
        'declaration-bang-space-after': ['never', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the bang of declarations.
        'declaration-bang-space-before': ['always', { severity: 'warning' }],

        // Disallow duplicate properties within declaration blocks.
        'declaration-block-no-duplicate-properties': [true, { severity: 'error' }],

        // Disallow shorthand properties that override related longhand properties within declaration blocks.
        'declaration-block-no-shorthand-property-overrides': [true, { severity: 'error' }],

        // Require a newline or disallow whitespace after the semicolons of declaration blocks.
        'declaration-block-semicolon-newline-after': ['always', { severity: 'warning' }],

        // Require a newline or disallow whitespace before the semicolons of declaration blocks.
        'declaration-block-semicolon-newline-before': ['never-multi-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace after the semicolons of declaration blocks.
        'declaration-block-semicolon-space-after': ['always-single-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the semicolons of declaration blocks.
        'declaration-block-semicolon-space-before': ['never', { severity: 'warning' }],

        // Limit the number of declaration within single line declaration blocks.
        'declaration-block-single-line-max-declarations': [1, { severity: 'error' }],

        // Require or disallow a trailing semicolon within declaration blocks.
        'declaration-block-trailing-semicolon': ['always', { severity: 'error' }],

        // Require a newline or disallow whitespace after the colon of declarations.
        //"declaration-colon-newline-after": null,

        // Require a single space or disallow whitespace after the colon of declarations.
        'declaration-colon-space-after': ['always-single-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the colon of declarations.
        'declaration-colon-space-before': ['never', { severity: 'warning' }],

        // Require or disallow an empty line before declarations.
        //"declaration-empty-line-before": null,

        // Disallow !important within declarations.
        'declaration-no-important': [true, { severity: 'warning' }],

        // Specify a blacklist of disallowed units for specfic properties.
        //"declaration-property-unit-blacklist": null,

        // Specify a whitelist of disallowed units for specfic properties.
        //"declaration-property-unit-whitelist": null,

        // Specify a blacklist of disallowed property-value pairs.
        //"declaration-property-value-blacklist": null,

        // Specify a whitelist of allowed property-value pairs.
        //"declaration-property-value-whitelist": null,

        // Specify whether or not quotation marks should be used around font family names, and whether single or double.
        //"font-family-name-quotes": null,

        // Disallow duplicate font family names.
        'font-family-no-duplicate-names': [true, { severity: 'warning' }],

        // Disallow missing generic families in lists of font family names.
        'font-family-no-missing-generic-family-keyword': [true, { severity: 'warning' }],

        // Require consistent numeric or named font-weight values.
        'font-weight-notation': ['numeric', { severity: 'warning' }],

        // Specify a blacklist of disallowed functions.
        //"function-blacklist": null,

        // Disallow an invalid expression within calc functions.
        'function-calc-no-invalid': [true, { severity: 'error' }],

        // Disallow an unspaced operator within calc functions.
        'function-calc-no-unspaced-operator': [true, { severity: 'warning' }],

        // Require a newline or disallow whitespace after the commas of functions.
        'function-comma-newline-after': ['always-multi-line', { severity: 'warning' }],

        // Require a newline or disallow whitespace before the commas of functions.
        'function-comma-newline-before': ['never-multi-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace after the commas of functions.
        'function-comma-space-after': ['always-single-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the commas of functions.
        'function-comma-space-before': ['never', { severity: 'warning' }],

        // Disallow direction values in linear-gradient() calls that are not valid according to the standard syntax.
        //"function-linear-gradient-no-nonstandard-direction": null,

        // Limit the number of adjacent empty lines within functions.
        'function-max-empty-lines': [0, { severity: 'warning' }],

        // Specify lowercase or uppercase for function names.
        'function-name-case': ['lower', {
            ignoreFunctions: ['sassToJs'],
            severity: 'error',
        }],

        // Require a newline or disallow whitespace on the inside of the parentheses of functions.
        'function-parentheses-newline-inside': ['always-multi-line', { severity: 'error' }],

        // Require a single space or disallow whitespace on the inside of the parentheses of functions.
        'function-parentheses-space-inside': ['never-single-line', { severity: 'error' }],

        // Disallow scheme-relative urls.
        //"function-url-no-scheme-relative": null,

        // Specify a blacklist of disallowed url schemes.
        //"function-url-scheme-blacklist": null,

        // Specify a whitelist of disallowed url schemes.
        //"function-url-scheme-whitelist": null,

        // Specify single, double or no quotes for urls.
        'function-url-quotes': ['always', { severity: 'warning' }],

        // Specify a whitelist of only allowed functions.
        //"function-whitelist": null,

        // Require a single space or disallow whitespace after functions.
        'function-whitespace-after': ['always', { severity: 'warning' }],

        // Specify indentation.
        indentation: [4, { severity: 'error' }],

        // Disallow `!important` within keyframe declarations.
        //"keyframe-declaration-no-important": null,

        // Specify a pattern for keyframe names.
        //"keyframes-name-pattern": null,

        // Disallow units for zero lengths.
        'length-zero-no-unit': [true, { severity: 'warning' }],

        // Specify unix or windows linebreaks.
        linebreaks: ['unix', { severity: 'warning' }],

        // Limit the number of adjacent empty lines.
        'max-empty-lines': [2, {
            ignore: ['comments'],
            severity: 'warning',
        }],

        // Limit the length of a line.
        //"max-line-length": null,

        // Limit the depth of nesting.
        'max-nesting-depth': [5, {
            ignore: ['blockless-at-rules'],
            severity: 'error',
        }],

        // Require a single space or disallow whitespace after the colon in media features.
        'media-feature-colon-space-after': ['always', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the colon in media features.
        'media-feature-colon-space-before': ['never', { severity: 'warning' }],

        // Specify a blacklist of disallowed media feature names.
        //"media-feature-name-blacklist": null,

        // Specify lowercase or uppercase for media feature names.
        'media-feature-name-case': ['lower', { severity: 'warning' }],

        // Disallow unknown media feature names.
        //"media-feature-name-no-unknown": null,

        // Disallow vendor prefixes for media feature names.
        'media-feature-name-no-vendor-prefix': [true, { severity: 'error' }],

        // Specify a whitelist of allowed media feature name and value pairs.
        //"media-feature-name-value-whitelist": null,

        // Specify a whitelist of allowed media feature names.
        //"media-feature-name-whitelist": null,

        // Require a single space or disallow whitespace on the inside of the parentheses within media features.
        'media-feature-parentheses-space-inside': ['never', { severity: 'error' }],

        // Require a single space or disallow whitespace after the range operator in media features.
        'media-feature-range-operator-space-after': ['always', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the range operator in media features.
        'media-feature-range-operator-space-before': ['always', { severity: 'warning' }],

        // Require a newline or disallow whitespace after the commas of media query lists.
        'media-query-list-comma-newline-after': ['always-multi-line', { severity: 'warning' }],

        // Require a newline or disallow whitespace before the commas of media query lists.
        'media-query-list-comma-newline-before': ['never-multi-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace after the commas of media query lists.
        'media-query-list-comma-space-after': ['always-single-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the commas of media query lists.
        'media-query-list-comma-space-before': ['never', { severity: 'warning' }],

        // Disallow selectors of lower specificity from coming after overriding selectors of higher specificity.
        //"no-descending-specifity": null,

        // Disallow duplicate `@import` rules within a stylesheet.
        'no-duplicate-at-import-rules': [true, { severity: 'error' }],

        // Disallow duplicate selectors.
        //"no-duplicate-selectors": null,

        // Disallow empty first lines.
        'no-empty-first-line': [true, { severity: 'warning' }],

        // Disallow empty sources.
        'no-empty-source': [true, { severity: 'error' }],

        // Disallow end-of-line whitespace.
        'no-eol-whitespace': [true, { severity: 'warning' }],

        // Disallow extra semicolons.
        'no-extra-semicolons': [true, { severity: 'warning' }],

        // Disallow double-slash comments (//...) which are not supported by CSS.
        //"no-invalid-double-slash-comments": null,

        // Disallow missing end-of-source newlines.
        'no-missing-end-of-source-newline': [true, { severity: 'warning' }],

        // Disallow animation names that do not correspond to a @keyframes declaration.
        'no-unknown-animations': [true, { severity: 'error' }],

        // Require or disallow a leading zero for fractional numbers less than 1.
        'number-leading-zero': ['always', { severity: 'error' }],

        // Limit the number of decimal places allowed in numbers.
        'number-max-precision': [3, { severity: 'warning' }],

        // Disallow trailing zeros within numbers.
        //"number-no-trailing-zeros": null,

        // Specify a blacklist of disallowed properties.
        //"property-blacklist": null,

        // Specify lowercase or uppercase for properties.
        'property-case': ['lower', { severity: 'error' }],

        // Disallow unknown properties.
        'property-no-unknown': [true, { severity: 'warning' }],

        // Disallow vendor prefixes for properties.
        'property-no-vendor-prefix': [true, { severity: 'error' }],

        // Specify a whitelist of allowed properties.
        //"property-whitelist": null,

        // Require or disallow an empty line before nested rules.
        'rule-empty-line-before': ['always-multi-line', {
            except: ['first-nested'],
            ignore: ['after-comment'],
            severity: 'warning',
        }],

        // Require a single space or disallow whitespace on the inside of the brackets within attribute selectors.
        'selector-attribute-brackets-space-inside': ['never', { severity: 'warning' }],

        // Specify a blacklist of disallowed attribute operators.
        //"selector-attribute-operator-blacklist": null,

        // Require a single space or disallow whitespace after operators within attribute selectors.
        'selector-attribute-operator-space-after': 'never',

        // Require a single space or disallow whitespace before operators within attribute selectors.
        'selector-attribute-operator-space-before': 'never',

        // Specify a whitelist of allowed attribute operators.
        //"selector-attribute-operator-whitelist": null,

        // Require or disallow quotes for attribute values.
        'selector-attribute-quotes': 'always',

        // Specify a pattern for class selectors.
        //"selector-class-pattern": null,

        // Specify a blacklist of disallowed combinators.
        // "selector-combinator-blacklist": null,

        // Require a single space or disallow whitespace after the combinators of selectors.
        'selector-combinator-space-after': ['always', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the combinators of selectors.
        'selector-combinator-space-before': ['always', { severity: 'warning' }],

        // Specify a whitelist of allowed combinators.
        // "selector-combinator-whitelist": null,

        // Disallow non-space characters for descendant combinators of selectors.
        'selector-descendant-combinator-no-non-space': [true, { severty: 'warning' }],

        // Specify a pattern for id selectors.
        //"selector-id-pattern": null,

        // Require a newline or disallow whitespace after the commas of selector lists.
        //"selector-list-comma-newline-after": null,

        // Require a newline or disallow whitespace before the commas of selector lists.
        'selector-list-comma-newline-before': ['never-multi-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace after the commas of selector lists.
        'selector-list-comma-space-after': ['always-single-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the commas of selector lists.
        'selector-list-comma-space-before': ['never', { severity: 'warning' }],

        // Limit the number of attribute selectors in a selector
        //"selector-max-attribute": null,

        // Limit the number of classes in a selector.
        //"selector-max-class": null,

        // Limit the number of combinators in a selector.
        //"selector-max-combinators": null,

        // Limit the number of compound selectors in a selector.
        //"selector-max-compound-selectors": null,

        // Limit the number of adjacent empty lines within selectors.
        'selector-max-empty-lines': [0, { severity: 'warning' }],

        // Limit the number of id selectors in a selector.
        'selector-max-id': [0, { severity: 'warning' }],

        // Limit the number of pseudo-classes in a selector.
        // "selector-max-pseudo-class": null,

        // Limit the specificity of selectors.
        'selector-max-specificity': ['1,4,2', { severity: 'error' }], /* https://specificity.keegan.st/ */

        // Limit the number of type in a selector.
        //"selector-max-type": null,

        // Limit the number of universal selectors in a selector.
        'selector-max-universal': [0, { severity: 'warning' }],

        // Specify a pattern for the selectors of rules nested within rules.
        //"selector-nested-pattern": null,

        // Disallow qualifying a selector by type.
        'selector-no-qualifying-type': [true, {
            ignore: ['attribute'],
            severity: 'warning',
        }],

        // Disallow vendor prefixes for selectors.
        'selector-no-vendor-prefix': [true, { severity: 'error' }],

        // Specify a blacklist of disallowed pseudo-class selectors.
        //"selector-pseudo-class-blacklist": null,

        // Specify lowercase or uppercase for pseudo-class selectors.
        'selector-pseudo-class-case': ['lower', { severity: 'error' }],

        // Disallow unknown pseudo-class selectors.
        'selector-pseudo-class-no-unknown': [true, { severity: 'error' }],

        // Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors.
        'selector-pseudo-class-parentheses-space-inside': ['never', { severity: 'error' }],

        // Specify a whitelist of allowed pseudo-class selectors.
        //"selector-pseudo-class-whitelist": null,

        // Specify a blacklist of disallowed pseudo-element selectors.
        // "selector-pseudo-element-blacklist": null,

        // Specify lowercase or uppercase for pseudo-element selectors.
        'selector-pseudo-element-case': ['lower', { severity: 'error' }],

        // Specify single or double colon notation for applicable pseudo-elements.
        'selector-pseudo-element-colon-notation': ['double', { severity: 'error' }],

        // Disallow unknown pseudo-element selectors.
        'selector-pseudo-element-no-unknown': [true, { severity: 'error' }],

        // Specify a whitelist of allowed pseudo-element selectors.
        // "selector-pseudo-element-whitelist": null,

        // Specify lowercase or uppercase for type selector.
        'selector-type-case': ['lower', { severity: 'error' }],

        // Disallow unknown type selectors.
        'selector-type-no-unknown': [true, { severity: 'error' }],

        // Disallow redundant values in shorthand properties.
        'shorthand-property-no-redundant-values': [true, { severity: 'warning' }],

        // Disallow (unescaped) newlines in strings.
        'string-no-newline': [true, { severity: 'error' }],

        // Specify single or double quotes around strings
        'string-quotes': ['single', { severity: 'warning' }],

        // Disallow animation and transition times under 100ms.
        //"time-min-milliseconds": null,

        // Specify a blacklist of disallowed units.
        'unit-blacklist': [['s', 'in', 'pt', 'pc', 'mm', 'cm', 'ch', 'ex'], { severity: 'error' }],

        // Specify lowercase or uppercase for units.
        'unit-case': ['lower', { severity: 'error' }],

        // Disallow unknown units.
        'unit-no-unknown': [true, { severity: 'error' }],

        // Specify a whitelist of allowed units.
        //"unit-whitelist": null,

        // Specify lowercase or uppercase for keywords values.
        'value-keyword-case': ['lower', { severity: 'error' }],

        // Require a newline or disallow whitespace after the commas of value lists.
        'value-list-comma-newline-after': ['always-multi-line', { severity: 'warning' }],

        // Require a newline or disallow whitespace before the commas of value lists.
        'value-list-comma-newline-before': ['never-multi-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace after the commas of value lists.
        'value-list-comma-space-after': ['always-single-line', { severity: 'warning' }],

        // Require a single space or disallow whitespace before the commas of value lists.
        'value-list-comma-space-before': ['never-single-line', { severity: 'warning' }],

        // Limit the number of adjacent empty lines within value lists.
        'value-list-max-empty-lines': [0, { severity: 'warning' }],

        // Disallow vendor prefixes for values.
        'value-no-vendor-prefix': [true, { severity: 'error' }],
    },
};
