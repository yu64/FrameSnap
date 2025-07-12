import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // インデント: 2スペース
      indent: ['error', 2, { SwitchCase: 1 }],

      // ダブルクォート
      quotes: ['error', 'double'],

      // セミコロン必須
      semi: ['error', 'always'],

      // trailing comma
      'comma-dangle': ['error', 'always-multiline'],

      // 1行80文字（例外あり）
      'max-len': ['warn', { code: 80, ignoreUrls: true }],

      // オールマンスタイル（{ を改行）
      'brace-style': ['error', 'allman'],

      // 演算子改行: 演算子を行頭に
      'operator-linebreak': ['error', 'before'],

      // メソッドチェーン: ドットを行頭に
      'dot-location': ['error', 'property'],

      // クラス/関数の最大ネスト深度
      'max-depth': ['warn', 4], // クラスベース
      'max-nested-callbacks': ['warn', 3], // 関数ベース

      // できるだけシンプルに（複雑度警告）
      complexity: ['warn', 6],

      // 命名規則: ローワーキャメルケース
      camelcase: ['error', { properties: 'always' }],

      // 等価演算子を厳密化
      eqeqeq: ['error', 'always'],

      // オブジェクトの記法: キー「: 」値
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],

      // import/exportの重複禁止
      'no-duplicate-imports': 'error',
      'import/no-duplicates': 'error',

      // 未使用変数を許可
      'no-unused-vars': "off",

      // グローバル変数を不許可
      "no-implicit-globals": "error"

      // アーリーリターン推奨（標準ルールなし、コメントでガイド）

      // メソッド呼び出しの深さ（標準ルールなし、コメントでガイド）
    },
  },
])
