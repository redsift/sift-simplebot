import transpiler from 'rollup-plugin-babel';
// import transpiler from 'rollup-plugin-buble'; // buble has problems with comments in JSX
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import hypothetical from 'rollup-plugin-hypothetical';
import eslint from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';

export default {
    dest: './public/dist/js/first-use.es2015.js',
    entry: './src/scripts/first-use/index.js',
    format: 'es',
    // globals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // },
    exports: 'named',
    plugins: [
        hypothetical({
            allowRealFiles: true,
            files: {
                './src/styles/index.styl': `
          export default function() {
            console.log('Replace inclusion of styles via "import" with this dummy, as we are bundling the styles separately for production.');
          }
        `,
                './src/styles/index.styl': `
          export default function() {
            console.log('Replace inclusion of styles via "import" with this dummy, as we are bundling the styles separately for production.');
          }
        `
            }
        }),
        json(),
        resolve({
            module: true,
            jsnext: true,
            browser: true,
            main: true,
            // skip: [ 'react', 'react-dom' ],
            extensions: ['.js', '.jsx', '.json']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            "import React from 'react'": "import * as React from 'react'"
        }),
        cjs({
            // NOTE: config taken from here: https://github.com/rollup/rollup/issues/502
            namedExports: {
                'node_modules/react/react.js': ['Component', 'Children', 'createElement', 'PropTypes'],
                'node_modules/react-dom/index.js': ['render']
            }
        }),
        eslint({
            configFile: '.eslintrc',
            exclude: 'node_modules/**',
        }),
        transpiler({
            babelrc: false,
            presets: ['es2015-rollup', 'stage-0', 'react'],
            plugins: ['transform-decorators-legacy']
        }),
        filesize()
    ],
    sourceMap: true
}
