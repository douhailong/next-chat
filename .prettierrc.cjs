// https://juejin.cn/post/6938687606687432740
module.exports = {
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/208
  plugins: [
    'prettier-plugin-tailwindcss',
    'prettier-plugin-packagejson',
    // 提交前再打开格式化
    'prettier-plugin-organize-imports'
  ],
  // tailwindConfig: "./tailwind.config.ts",
  tabWidth: 2,
  trailingComma: 'none',
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  endOfLine: 'lf',
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  useTabs: false
};
