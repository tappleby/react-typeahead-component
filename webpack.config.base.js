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

var propTypesExternal = {
  root: 'PropTypes',
  commonjs2: 'prop-types',
  commonjs: 'prop-types',
  amd: 'prop-types'
};

module.exports = {
  externals: {
    'react': reactExternal,
    'react-dom': reactDomExternal,
    'prop-types': propTypesExternal
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