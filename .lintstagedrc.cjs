module.exports = {
  '*.{js,jsx,ts,tsx,mjs,cjs}': ['prettier --write', 'eslint --fix'],
  '*.{md,json}': 'prettier --write',
};
