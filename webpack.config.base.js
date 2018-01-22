'use strict';

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactDomExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};

module.exports = {
  externals: {
    'react': reactExternal,
    'react-dom': reactDomExternal
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/
      }
    ]
  },
  output: {
    library: 'Typeahead',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};