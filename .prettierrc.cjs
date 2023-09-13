module.exports = {
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/208
  plugins: ['prettier-plugin-tailwindcss'],
  // tailwindConfig: "./tailwind.config.ts",
  tabWidth: 2,
  trailingComma: 'none',
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  endOfLine: 'lf',
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'always',
  useTabs: false
};
// https://juejin.cn/post/6938687606687432740
// 修改设置后使用yarn prettier格式化所有文件
