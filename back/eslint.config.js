// eslint.config.js
import js from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'
import securityPlugin from 'eslint-plugin-security'
import globals from 'globals'

export default [
  // Configuración base de ESLint
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node, // Esto incluye console, process, etc.
        ...globals.es2020
      }
    }
  },

  // Configuración para TypeScript
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
      promise: promisePlugin,
      security: securityPlugin
    },
    rules: {
      // Reglas de TypeScript
      ...typescriptPlugin.configs.recommended.rules,

      // Reglas personalizadas
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Reglas de import
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],

      // Reglas de security (si están instaladas)
      ...(securityPlugin
        ? {
            'security/detect-object-injection': 'warn',
            'security/detect-non-literal-require': 'warn',
            'security/detect-non-literal-fs-filename': 'warn'
          }
        : {})
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    }
  },

  // Archivos específicos a ignorar
  {
    ignores: ['node_modules/', 'dist/', 'coverage/', '*.js', '!eslint.config.js']
  }
]
