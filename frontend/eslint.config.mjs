import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['build/**', 'node_modules/**', '.firebase/**']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    prettierConfig,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        settings: {
            react: {
                version: 'detect'
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
            'react/prop-types': 'off',
            'react/jsx-key': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off'
        }
    }
);
