import uglify from 'rollup-plugin-uglify';
import config from './es';

import * as pkg from '../../package.js';
const shortPkgName = pkg.name.replace('@redsift/', '');

const moduleName = shortPkgName.replace('rs-component-', '').split('-').map(w => {
  return w[0].toUpperCase() + w.substring(1);
}).join('');

config.format = 'umd';
config.moduleName = `RSComponent${moduleName}`;
config.dest = `public/dist/js/first-use.umd-es2015.min.js`;

config.plugins.push(uglify());

export default config;
