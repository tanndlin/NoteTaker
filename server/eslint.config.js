import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['build/**', 'node_modules/**']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        },
        plugins: {
            prettier
        },
        rules: {
            'eqeqeq': ['error', 'smart'],
            'eol-last': ['error'],
            'curly': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'semi': 'error',
            'space-before-blocks': 'error',
            'spaced-comment': 'warn',
            'quotes': [
                'error',
                'single',
                { avoidEscape: true }
            ],
            'prettier/prettier': [
                'error',
                { singleQuote: true, endOfLine: 'auto' }
            ],
            '@typescript-eslint/no-non-null-assertion': 'off'
        }
    }
);
