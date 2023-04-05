const {createGlobPatternsForDependencies} = require('@nrwl/angular/tailwind');
const {join} = require('path');
const sharedTailwindConfig = require('../../libs/theme/tailwind.config');

module.exports = {
  presets: [sharedTailwindConfig],
  // mode: 'jit',
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
};
