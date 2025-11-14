// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginReact from 'eslint-plugin-react';
import pluginImport from 'eslint-plugin-import'; 

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    ignores: ['dist', 'eslint.config.js']
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: pluginImport, // This line is crucial
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // If you want to enable import/no-unused-modules, uncomment the line below:
      // 'import/no-unused-modules': ['warn', { ignoreExports: ['index.js'] }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      html: {
        customElements: ['ion-icon'],
      },
      // If you plan to use more features from eslint-plugin-import, you might need to configure its resolver:
      // 'import/resolver': {
      //   node: {
      //     extensions: ['.js', '.jsx']
      //   }
      // }
    },
  },
];

config; // Added export default to make it a valid flat config file