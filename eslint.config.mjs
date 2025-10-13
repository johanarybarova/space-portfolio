import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import parser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import cssModules from 'eslint-plugin-css-modules'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import preferArrow from 'eslint-plugin-prefer-arrow'
import sortImports from 'eslint-plugin-sort-imports-es6-autofix'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'


export default [
  js.configs.recommended,
  {
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      prettier,
      cssModules,
      tanstackQuery,
      preferArrow,
      sortImports,
      import: importPlugin,
      'prefer-arrow': preferArrow,
      'react-hooks': reactHooks,
      'sort-imports-es6-autofix': sortImports,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      eqeqeq: 'error',
      semi: 'off',
      'arrow-parens': ['error', 'as-needed'],
      'arrow-body-style': ['error', 'as-needed'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      curly: ['error', 'all'],
      'prefer-arrow-callback': 'error',
      'no-use-before-define': 'off',
      'new-parens': 'error',
      'no-bitwise': 'error',
      'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
      'no-caller': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
      'quote-props': ['error', 'as-needed'],
      'func-style': ['error', 'expression'],
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'], markers: ['/'] }],
      'no-sparse-arrays': 'off',
      'no-duplicate-imports': 'error',
      'import/newline-after-import': 'error',
      'no-constant-binary-expression': 'error',
      yoda: ['error', 'never'],
      'object-shorthand': ['error', 'properties'],
      'no-async-promise-executor': 'off',
      'newline-before-return': 'error',
      'no-new-object': 'error',
      'prefer-object-spread': 'error',
      'no-array-constructor': 'error',
      'array-callback-return': 'error',
      'prefer-template': 'error',
      'no-eval': 'error',
      'no-useless-escape': 'error',
      'no-loop-func': 'error',
      'prefer-rest-params': 'error',
      'no-new-func': 'error',
      'prefer-spread': 'error',
      'no-iterator': 'error',
      'prefer-const': 'error',
      'one-var': ['error', 'never'],
      'no-multi-assign': 'error',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-else-return': 'error',
      'no-new-wrappers': 'error',

      // React
      'react/boolean-prop-naming': ['error', {
        rule: '^((is|are|has|was|were|should|can|did|will|with)[A-Z]([A-Za-z0-9]?)+|loading|visible|disabled|opened)',
        validateNested: true,
      }],
      'react/react-in-jsx-scope': 'off',
      'react/style-prop-object': ['error', { allow: ['FormattedNumber'] }],
      'react/hook-use-state': 'error',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-key': ['error', {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      }],
      'react/jsx-no-target-blank': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-children-prop': 'error',
      'react/no-array-index-key': 'off',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/void-dom-elements-no-children': 'error',
      'react/self-closing-comp': 'error',
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      'react/no-unknown-property': 'error',
      'react/no-this-in-sfc': 'error',
      'react/no-direct-mutation-state': 'off',
      'react/jsx-curly-brace-presence': ['error', {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      }],
      'react/jsx-boolean-value': ['error', 'never'],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Prettier
      'prettier/prettier': ['error', {
        endOfLine: 'auto',
        semi: false,
        useTabs: false,
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        arrowParens: 'avoid',
        jsxSingleQuote: true,
      }],

      // Optional plugins
      'prefer-arrow/prefer-arrow-functions': ['error', {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      }],
      'sort-imports-es6-autofix/sort-imports-es6': [2, {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      }],
      'css-modules/no-undef-class': 'off',
      'css-modules/no-unused-class': 'off',
    },
  },
]

export const ignores = ['node_modules', '.next', 'dist']