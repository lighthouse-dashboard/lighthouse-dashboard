module.exports = {
  "extends": "@dreipol/stylelint-config",
  "plugins": [
    "stylelint-order",
    "stylelint-selector-bem-pattern"
  ],
  "rules": {
    "plugin/selector-bem-pattern": {
      "implicitComponents": [
        "**/js/app/framework/**/*",
        "**/scss/app/structure/**/*"
      ],
      "componentName": "^[a-z]+(?:-[a-z]+)*(--|__|$)?",
      "componentSelectors": function(fileName, presetOptions) {
        const WORD = "([a-z]+(-[a-z]+)*)";
        const SCSS_INTERPOLATION = "(.*#{.*}.*)";

        const ns = (presetOptions && presetOptions.namespace) ? `${ presetOptions.namespace }-` : "";

        const block = fileName.match(/^([a-z]+(-[a-z]+)*)+?/g);
        const element = `(?:--${ WORD })?`;
        const modifier = `(?:__${ WORD })?`;
        const attribute = "(?:\\[.+\\])?";
        const bemSelector = `(\\w)*(\\.${ns}${ block }${ element }${ modifier }${ attribute }|${ SCSS_INTERPOLATION })*`;

        return new RegExp(`^(${ bemSelector })$`);
      },
      "ignoreSelectors": [
        "\\.(u|trs)-([a-z]+(-[a-z]+)*)",
        "^(html|body|&)"
      ],
    },
    "order/order": [["dollar-variables", "declarations", "rules"], { "severity": "warning" }],
    "order/properties-order": [
      [
        // Strong properties (for easy debugging)
        {
          "order": "strict",
          "properties": [
            "content",
            "pointer-events",
            "z-index",
            "order",
          ]
        },
        // Position
        "position",
        // Position properties
        {
          "order": "flexible",
          "properties": [
            "top",
            "right",
            "bottom",
            "left",
          ]
        },
        // Display
        "display",
        // Flexible layout properties
        {
          "order": "flexible",
          "properties": [
            "align-content",
            "align-items",
            "align-self",
            "flex",
            "justify-content",
          ]
        },
        // Basic box model properties
        {
          "order": "flexible",
          "properties": [
            "width",
            "max-width",
            "min-width",
            "height",
            "max-height",
            "min-height",
            "margin",
            "padding",
          ]
        },
      ], {
        "severity": "warning"
      }
    ],
  }
};
