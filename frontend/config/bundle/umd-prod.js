import uglify from 'rollup-plugin-uglify';
import config from './es';

config.format = 'umd';
config.moduleName = 'firstuse';
config.dest = `public/dist/js/first-use.umd-es2015.min.js`;

config.plugins.push(uglify());

export default config;
