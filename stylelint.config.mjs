export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['stylelint-scss', 'stylelint-prettier', 'stylelint-order'],
  rules: {
    'prettier/prettier': [
      true,
      {
        singleQuote: true,
      },
    ],
    'no-unknown-animations': true,
    'declaration-no-important': null,
    'selector-class-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/at-function-pattern': null,
    'custom-property-pattern': null,
    'keyframes-name-pattern': null,
    'no-descending-specificity': null,
    'number-max-precision': null,
    'media-feature-range-notation': null,
  },
}
