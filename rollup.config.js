import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import pkg from './package.json'
const inputFileName = "src/main.ts";
const extensions = [
  '.js', '.ts'
];
export default [{
  //输出浏览器
  input: inputFileName,
  output: [{
    file: pkg.main,
    format: 'cjs'
  }, {
    file: pkg.module,
    format: 'esm',
  }],
  plugins: [
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions
    }),
    commonjs(),
    babel({ exclude: './node_modules/**', babelHelpers: 'runtime', extensions }),
  ]
}]